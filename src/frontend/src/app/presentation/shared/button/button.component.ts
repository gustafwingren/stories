import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LoginIconComponent } from '../icons/login-icon/login-icon.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-button',
	imports: [NgClass, LoginIconComponent, RouterLink],
	templateUrl: './button.component.html',
	styleUrl: './button.component.css',
})
export class ButtonComponent {
	invert = input<boolean>(false);
}
