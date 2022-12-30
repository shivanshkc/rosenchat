import { Component } from '@angular/core';

import { OAuthProvider } from '../../core/enums';
import { tc } from '../../core/utils';
import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AbstractLoggerService } from '../../services/logger/logger.abstract';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor(private readonly _authService: AbstractAuthService, private readonly _log: AbstractLoggerService) {}

  /**
   * @description onGoogleLoginClick handles clicks on the Google login button.
   */
  public async onGoogleLoginClick(): Promise<void> {
    const [err] = await tc(this._authService.startLogin(OAuthProvider.Google));
    if (err) {
      this._log.error({ snack: true }, err);
    }
  }
}
