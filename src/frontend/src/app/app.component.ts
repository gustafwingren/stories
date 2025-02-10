import { Component, inject, Signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuComponent } from './presentation/shared/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ProfileStore } from './data/profile/profile.store';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	imports: [RouterOutlet, MenuComponent],
})
export class AppComponent {
	profileStore = inject(ProfileStore);
	private breakpointObserver = inject(BreakpointObserver);

	isHandset: Signal<boolean> = toSignal(
		this.breakpointObserver.observe(Breakpoints.Handset).pipe(
			map((result) => result.matches),
			shareReplay(),
		),
		{ initialValue: false },
	);
}
