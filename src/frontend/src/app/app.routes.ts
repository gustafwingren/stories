import {CanActivateFn, Router, Routes} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {inject} from "@angular/core";

export const AuthorizedGuardFunction: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);

    return false;
  }

  return true;
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./presentation/pages/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./presentation/pages/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [AuthorizedGuardFunction]
  },
]

