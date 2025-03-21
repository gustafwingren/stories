import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
	MSAL_GUARD_CONFIG,
	MsalBroadcastService,
	MsalService,
} from '@azure/msal-angular';
import { ProfileStore } from '../data/profile/profile.store';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';

describe('AuthServiceService', () => {
	let service: AuthService;
	let profileStore = {
		isLoggedIn: signal(false),
		updateIsLoggedIn: jest.fn(),
	};
	let routerMock = {
		navigate: jest.fn(),
	};
	let msalSubject: Subject<EventMessage>;
	let inProgressSubject: BehaviorSubject<InteractionStatus>;
	let msalServiceMock = {
		loginRedirect: jest.fn(),
		logoutRedirect: jest.fn(),
		handleRedirectObservable: jest.fn().mockReturnValue(new Subject()),
		instance: {
			enableAccountStorageEvents: jest.fn(),
			getAllAccounts: jest.fn().mockReturnValue([]),
			getActiveAccount: jest.fn(),
			setActiveAccount: jest.fn(),
		},
	};

	beforeEach(() => {
		msalSubject = new Subject<EventMessage>();
		inProgressSubject = new BehaviorSubject<InteractionStatus>(InteractionStatus.None);
		
		TestBed.configureTestingModule({
			providers: [
				{
					provide: MsalService,
					useValue: msalServiceMock,
				},
				{
					provide: MsalBroadcastService,
					useValue: {
						msalSubject$: msalSubject,
						inProgress$: inProgressSubject,
					},
				},
				{
					provide: MSAL_GUARD_CONFIG,
					useValue: {
						authRequest: { scopes: ['user.read'] },
					},
				},
				{ provide: ProfileStore, useValue: profileStore },
				{ provide: Router, useValue: routerMock },
			],
		});
		service = TestBed.inject(AuthService);
		jest.clearAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should navigate to profile if loggedIn', () => {
		profileStore.isLoggedIn.set(true);
		TestBed.flushEffects();

		expect(routerMock.navigate).toHaveBeenCalledWith(['/profile']);
	});

	describe('login', () => {
		it('should login with redirect', () => {
			jest.clearAllMocks();
			service.login();
			expect(msalServiceMock.loginRedirect).toHaveBeenCalled();
		});

		it('should login with redirect when authRequest exists', () => {
			service.login();
			expect(msalServiceMock.loginRedirect).toHaveBeenCalledWith({ scopes: ['user.read'] });
		});
	});

	describe('logout', () => {
		it('should call logoutRedirect', () => {
			service.logout();
			expect(msalServiceMock.logoutRedirect).toHaveBeenCalled();
		});
	});

	describe('init', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should handle redirect observable and enable account storage events', async () => {
			await service.init();
			expect(msalServiceMock.handleRedirectObservable).toHaveBeenCalled();
			expect(msalServiceMock.instance.enableAccountStorageEvents).toHaveBeenCalled();
		});

		it('should navigate to login when account is removed', async () => {
			msalServiceMock.instance.getAllAccounts.mockReturnValue([]);
			await service.init();
			// Ensure interaction status is None before triggering account events
			inProgressSubject.next(InteractionStatus.None);
			msalSubject.next({ eventType: EventType.ACCOUNT_REMOVED } as EventMessage);
			expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
		});

		it('should set login and update store when account is added', async () => {
			msalServiceMock.instance.getAllAccounts.mockReturnValue([{ username: 'test' }]);
			await service.init();
			// Ensure interaction status is None before triggering account events
			inProgressSubject.next(InteractionStatus.None);
			msalSubject.next({ eventType: EventType.ACCOUNT_ADDED } as EventMessage);
			expect(profileStore.updateIsLoggedIn).toHaveBeenCalledWith(true);
		});

		it('should set active account when none is active but accounts exist', async () => {
			const accounts = [{ username: 'test' }];
			msalServiceMock.instance.getAllAccounts.mockReturnValue(accounts);
			msalServiceMock.instance.getActiveAccount.mockReturnValue(null);
			
			await service.init();
			// Wait for next event loop to ensure subscriptions are set up
			await new Promise(resolve => setTimeout(resolve, 0));
			inProgressSubject.next(InteractionStatus.None);
			TestBed.flushEffects();
			
			expect(msalServiceMock.instance.setActiveAccount).toHaveBeenCalledWith(accounts[0]);
		});

		it('should not set active account when one is already active', async () => {
			const accounts = [{ username: 'test' }];
			msalServiceMock.instance.getAllAccounts.mockReturnValue(accounts);
			msalServiceMock.instance.getActiveAccount.mockReturnValue(accounts[0]);
			
			await service.init();
			// Wait for next event loop to ensure subscriptions are set up
			await new Promise(resolve => setTimeout(resolve, 0));
			inProgressSubject.next(InteractionStatus.None);
			TestBed.flushEffects();
			
			expect(msalServiceMock.instance.setActiveAccount).not.toHaveBeenCalled();
		});
	});
});
