import { DestroyRef, effect, inject, Inject, Injectable } from '@angular/core';
import {
	MSAL_GUARD_CONFIG,
	MsalBroadcastService,
	MsalGuardConfiguration,
	MsalService,
} from '@azure/msal-angular';
import { filter } from 'rxjs';
import {
	EventMessage,
	EventType,
	InteractionStatus,
	RedirectRequest,
} from '@azure/msal-browser';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfileStore } from '../data/profile/profile.store';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	readonly profileStore = inject(ProfileStore);

	_ = effect(() => {
		if (this.profileStore.isLoggedIn()) {
			this.routerService.navigate(['/profile']);
		}
	});

	constructor(
		private msalService: MsalService,
		private msalBroadcastService: MsalBroadcastService,
		@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
		private routerService: Router,
		private destroyRef: DestroyRef,
	) {}

	async init(): Promise<void> {
		this.msalService.handleRedirectObservable().subscribe();

		this.msalService.instance.enableAccountStorageEvents();
		this.msalBroadcastService.msalSubject$
			.pipe(
				filter(
					(msg: EventMessage) =>
						msg.eventType === EventType.ACCOUNT_ADDED ||
						msg.eventType === EventType.ACCOUNT_REMOVED,
				),
			)
			.subscribe(() => {
				if (this.msalService.instance.getAllAccounts().length === 0) {
					this.routerService.navigate(['/login']);
				} else {
					this.setLogin();
				}
			});

		this.msalBroadcastService.inProgress$
			.pipe(
				filter(
					(status: InteractionStatus) => status === InteractionStatus.None,
				),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.setLogin();
				const activeAccount = this.msalService.instance.getActiveAccount();

				if (
					!activeAccount &&
					this.msalService.instance.getAllAccounts().length > 0
				) {
					const accounts = this.msalService.instance.getAllAccounts();
					this.msalService.instance.setActiveAccount(accounts[0]);
				}
			});
	}

	login() {
		if (this.msalGuardConfig.authRequest) {
			this.msalService.loginRedirect({
				...this.msalGuardConfig.authRequest,
			} as RedirectRequest);
		} else {
			this.msalService.loginRedirect();
		}
	}

	logout() {
		this.msalService.logoutRedirect();
	}

	private setLogin() {
		this.profileStore.updateIsLoggedIn(
			this.msalService.instance.getAllAccounts().length > 0,
		);
	}
}
