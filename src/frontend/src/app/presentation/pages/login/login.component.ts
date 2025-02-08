import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login',
  imports: [
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService: AuthService = inject(AuthService);

  loginRedirect() {
    this.authService.login();
  }
}
