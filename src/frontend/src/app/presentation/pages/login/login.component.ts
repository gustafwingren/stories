import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	authService: AuthService = inject(AuthService);

	loginRedirect() {
		this.authService.login();
	}
}
