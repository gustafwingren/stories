import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockAuthService: jest.Mocked<AuthService>;
    
    beforeEach(async () => {
        mockAuthService = {
            login: jest.fn(),
        } as unknown as jest.Mocked<AuthService>;
        
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [{ provide: AuthService, useValue: mockAuthService }],
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should inject AuthService', () => {
        expect(component.authService).toBeTruthy();
        expect(component.authService).toBe(mockAuthService);
    });
    
    it('should call authService.login when loginRedirect is called', () => {
        component.loginRedirect();
        expect(mockAuthService.login).toHaveBeenCalled();
    });
});
