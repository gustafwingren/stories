import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type HeaderState = {
	isMenuOpen: boolean;
};

const initialState: HeaderState = {
	isMenuOpen: false,
};

export const HeaderStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withMethods((store) => ({
		toggleMenu(): void {
			patchState(store, { isMenuOpen: !store.isMenuOpen() });
		},
	})),
);
