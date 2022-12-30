import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { OAuthProvider } from '../../core/enums';
import { tc } from '../../core/utils';
import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AbstractLoggerService } from '../../services/logger/logger.abstract';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authService: AbstractAuthService,
    private readonly _log: AbstractLoggerService,
  ) {}

  public async ngOnInit(): Promise<void> {
    const queryMap = await firstValueFrom(this._activatedRoute.queryParamMap);

    const err = queryMap.get('error');
    if (err) {
      this._log.error({ snack: true }, err);
      await this._router.navigate(['/landing']);
      return;
    }

    const idToken = queryMap.get('id_token');
    const provider = queryMap.get('provider');
    if (!idToken || !provider) {
      this._log.error({ snack: true }, 'Insufficient session info from backend.');
      await this._router.navigate(['/landing']);
      return;
    }
    if (!Object.values(OAuthProvider).includes(provider as OAuthProvider)) {
      this._log.error({ snack: true }, 'Unknown OAuth provider from backend.');
      await this._router.navigate(['/landing']);
      return;
    }

    const [errFinish] = await tc(this._authService.finishLogin(provider as OAuthProvider, idToken));
    if (errFinish) {
      this._log.error({ snack: true }, errFinish.message);
      await this._router.navigate(['/landing']);
      return;
    }

    await this._router.navigate(['/home']);
  }
}
