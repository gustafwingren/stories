import { Component, inject, Signal } from '@angular/core';
import {
	MatSidenav,
	MatSidenavContainer,
	MatSidenavContent,
} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './presentation/shared/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	imports: [
		RouterOutlet,
		MatSidenavContainer,
		MatSidenavContent,
		MatSidenav,
		MatToolbar,
		MatIconButton,
		MatIcon,
		MenuComponent,
	],
})
export class AppComponent {
	title = 'frontend';
	authService = inject(AuthService);
	private breakpointObserver = inject(BreakpointObserver);
	isHandset: Signal<boolean> = toSignal(
		this.breakpointObserver.observe(Breakpoints.Handset).pipe(
			map((result) => result.matches),
			shareReplay(),
		),
		{ initialValue: false },
	);
}
