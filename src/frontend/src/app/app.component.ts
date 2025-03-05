import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileStore } from './data/profile/profile.store';
import { HeaderStore } from './data/header/header.store';
import { MenuComponent } from './presentation/shared/menu/menu.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	imports: [RouterOutlet, MenuComponent, NgOptimizedImage],
})
export class AppComponent {
	profileStore = inject(ProfileStore);
	headerStore = inject(HeaderStore);
	protected readonly Headers = Headers;
}
