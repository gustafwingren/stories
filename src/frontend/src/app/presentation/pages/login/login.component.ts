import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LoginIconComponent } from '../../shared/icons/login-icon/login-icon.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	imports: [LoginIconComponent, ButtonComponent],
})
export class LoginComponent {
	authService: AuthService = inject(AuthService);

	loginRedirect() {
		this.authService.login();
	}
}
