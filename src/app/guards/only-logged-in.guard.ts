import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserSessionService } from '../services/user-session.service';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedInGuard implements CanActivate {
  constructor(private router: Router, private sessionService: UserSessionService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // Allow if the session is valid.
    if (await this.sessionService.isSessionValid()) {
      return true;
    }

    this.sessionService.removeSessionInfo();
    // Navigate to the landing page if the session is invalid.
    await this.router.navigate(['/landing']);
    return false;
  }
}
