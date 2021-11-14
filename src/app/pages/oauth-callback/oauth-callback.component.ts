import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { IOAuthService } from '../../client/oauth/oauth.interface';
import { OAuthGoogleService } from '../../client/oauth/oauth-google.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserSessionService } from '../../services/user-session.service';
import { tc } from '../../utils';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss'],
})
export class OauthCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private oAuthGoogle: OAuthGoogleService,
    private sessionService: UserSessionService,
    private snack: SnackbarService,
  ) {}

  async ngOnInit(): Promise<void> {
    const [err] = await tc(this.handleOAuthRedirect());
    if (err) {
      this.snack.error(err);
    }
  }

  private async handleOAuthRedirect(): Promise<void> {
    const routeParams = await firstValueFrom(this.activatedRoute.params);
    const queryParams = await firstValueFrom(this.activatedRoute.queryParams);

    const { provider } = routeParams;
    if (!provider) {
      await this.router.navigate(['/landing']);
      throw new Error('No OAuth provider found.');
    }

    let oAuthHandler: IOAuthService;
    if (provider === this.oAuthGoogle.providerName) {
      oAuthHandler = this.oAuthGoogle;
    } else {
      await this.router.navigate(['/landing']);
      throw new Error('Unknown OAuth provider.');
    }

    const authCode = queryParams['code'];
    if (!authCode) {
      await this.router.navigate(['/landing']);
      throw new Error('Authentication code not present.');
    }

    const accessToken = await oAuthHandler.code2Token(authCode);
    const userInfo = await oAuthHandler.token2UserInfo(accessToken);

    this.sessionService.putSessionInfo({ provider, accessToken, ...userInfo });
    await this.router.navigate(['/home']);

    this.snack.success('Logged in.');
  }
}
