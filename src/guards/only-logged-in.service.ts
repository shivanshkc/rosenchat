import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AbstractAuthService } from '../services/auth/auth.abstract';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedInService implements CanActivate {
  constructor(private readonly _router: Router, private readonly _authService: AbstractAuthService) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this._authService.isLoggedIn();
    if (!isLoggedIn) {
      await this._router.navigate(['/landing']);
      return false;
    }

    return true;
  }
}
