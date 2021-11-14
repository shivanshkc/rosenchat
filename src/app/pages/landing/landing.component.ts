import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { OAuthGoogleService } from '../../client/oauth/oauth-google.service';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private oAuthGoogle: OAuthGoogleService,
    private sessionService: UserSessionService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.handleOAuthRedirect();
  }

  public async onLoginClick(): Promise<void> {
    await this.oAuthGoogle.redirect();
  }

  /**
   * @description handleOAuthRedirect is invoked when the component is initialized.
   * It checks if the OAuth code parameter is present in the route query params.
   * If present and valid the user is logged in.
   *
   * @private
   */
  private async handleOAuthRedirect(): Promise<void> {
    const queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    await this.router.navigate([], { queryParams: {} });

    const authCode = queryParams['code'];
    if (!authCode) {
      return;
    }

    const token = await this.oAuthGoogle.code2Token(authCode);
    const userInfo = await this.oAuthGoogle.token2UserInfo(token);

    this.sessionService.putSessionInfo({ accessToken: token, ...userInfo });
  }
}
