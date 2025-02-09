import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type ProfileState = {
	isLoggedIn: boolean;
	name: string;
	email: string;
};

const initialState: ProfileState = {
	isLoggedIn: false,
	name: '',
	email: '',
};

export const ProfileStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withMethods((store) => ({
		updateIsLoggedIn(isLoggedIn: boolean): void {
			patchState(store, { isLoggedIn: isLoggedIn });
		},
	})),
);
