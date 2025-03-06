import { TestBed } from '@angular/core/testing';
import { AppInitService } from './app-init.service';
import { AuthService } from './auth.service';

describe('AppInitService', () => {
	let service: AppInitService;
	let mockAuthService: jest.Mocked<AuthService>;
	
	beforeEach(() => {
		mockAuthService = {
			init: jest.fn(),
		} as unknown as jest.Mocked<AuthService>;
		
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
			mockAuthService.init.mockResolvedValue(undefined);
			await service.init();
			expect(mockAuthService.init).toHaveBeenCalled();
		});
		
		it('should propagate errors from authService.init', async () => {
			const error = new Error('Auth initialization failed');
			mockAuthService.init.mockRejectedValue(error);
			await expect(service.init()).rejects.toThrow(error);
		});
	});
});
