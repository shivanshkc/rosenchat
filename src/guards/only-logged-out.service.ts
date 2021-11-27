import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AbstractAuthService } from '../services/auth/auth.abstract';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedOutService implements CanActivate {
  constructor(private readonly _router: Router, private readonly _authService: AbstractAuthService) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this._authService.isLoggedIn();
    if (isLoggedIn) {
      await this._router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
