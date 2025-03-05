import { TestBed } from '@angular/core/testing';

import { AppInitService } from './app-init.service';
import { AuthService } from './auth.service';

describe('AppInitService', () => {
	let service: AppInitService;
	let mockAuthService: jasmine.SpyObj<AuthService>;

	beforeEach(() => {
		mockAuthService = jasmine.createSpyObj('AuthService', ['init']);
		
		TestBed.configureTestingModule({
			providers: [
				{ provide: AuthService, useValue: mockAuthService }
			],
		});
		service = TestBed.inject(AppInitService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('init', () => {
		it('should call authService.init', async () => {
			mockAuthService.init.and.returnValue(Promise.resolve());

			await service.init();

			expect(mockAuthService.init).toHaveBeenCalled();
		});

		it('should propagate errors from authService.init', async () => {
			const error = new Error('Auth initialization failed');
			mockAuthService.init.and.returnValue(Promise.reject(error));

			await expectAsync(service.init()).toBeRejectedWith(error);
		});
	});
});
