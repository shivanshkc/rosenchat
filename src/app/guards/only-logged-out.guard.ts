import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserSessionService } from '../services/user-session.service';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedOutGuard implements CanActivate {
  constructor(private router: Router, private sessionService: UserSessionService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // Allow if the session is not valid.
    if (!this.sessionService.isSessionValid()) {
      this.sessionService.removeSessionInfo();
      return true;
    }

    // Navigate to home if the session is valid.
    await this.router.navigate(['/home']);
    return false;
  }
}
