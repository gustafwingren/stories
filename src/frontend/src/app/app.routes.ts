import { CanActivateFn, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ProfileStore } from './data/profile/profile.store';

export const AuthorizedGuardFunction: CanActivateFn = () => {
	const profileStore = inject(ProfileStore);
	const router = inject(Router);

	if (!profileStore.isLoggedIn()) {
		router.navigate(['/login']);

		return false;
	}

	return true;
};

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadComponent: () =>
			import('./presentation/pages/login/login.component').then(
				(c) => c.LoginComponent,
			),
	},
	{
		path: 'profile',
		loadComponent: () =>
			import('./presentation/pages/profile/profile.component').then(
				(c) => c.ProfileComponent,
			),
		canActivate: [AuthorizedGuardFunction],
	},
];
