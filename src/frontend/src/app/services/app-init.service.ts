import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  authService: AuthService = inject(AuthService);

  async init(): Promise<void> {
    await this.authService.init();
  }
}
