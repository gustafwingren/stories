import { Component, inject } from '@angular/core';
import { HeaderStore } from '../../../data/header/header.store';
import { ProfileStore } from '../../../data/profile/profile.store';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.css',
	imports: [RouterLink, ButtonComponent],
})
export class MenuComponent {
	headerStore = inject(HeaderStore);
	profileStore = inject(ProfileStore);
}
