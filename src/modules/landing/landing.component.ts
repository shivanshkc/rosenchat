import { Component } from '@angular/core';

import { AbstractAuthService } from '../../services/auth/auth.interface';
import { OAuthProvider } from '../../shared/enums';
import { tc } from '../../shared/utils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor(private readonly _authService: AbstractAuthService) {}

  /**
   * @description onGoogleLoginClick handles clicks on the Google login button.
   */
  public async onGoogleLoginClick(): Promise<void> {
    const [err] = await tc(this._authService.startLogin(OAuthProvider.Google));
    if (err) {
    }
  }
}
