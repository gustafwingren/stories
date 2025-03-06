import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu.component';
import { ActivatedRoute } from '@angular/router';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			imports: [NoopAnimationsModule],
			providers: [{ provide: ActivatedRoute, useValue: {} }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should compile', () => {
		expect(component).toBeTruthy();
	});
});
