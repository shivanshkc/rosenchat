import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import jwtDecode from 'jwt-decode';
import { firstValueFrom, Observable } from 'rxjs';

import { OAuthProvider } from '../../core/enums';
import { SessionInfoDTO } from '../../core/models';
import { ConfigService } from '../../modules/config/config.service';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';
import { AbstractAuthService } from './auth.abstract';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AbstractAuthService {
  private readonly _sessionInfoKey = 'sessionInfo';

  constructor(
    private readonly _conf: ConfigService,
    private readonly _storage: StorageMap,
    private readonly _router: Router,
    private _rosenbrige: AbstractRosenBridgeService,
  ) {}

  public async startLogin(provider: OAuthProvider): Promise<void> {
    const { backend } = await this._conf.get();
    window.location.href = `${backend.baseURL}/api/auth/${provider}?redirect_uri=http://localhost:4200/auth/callback`;
  }

  public async finishLogin(provider: OAuthProvider, idToken: string): Promise<void> {
    const { email } = jwtDecode(idToken) as { email: string };

    const sessionInfo: SessionInfoDTO = { email, provider, idToken };
    await firstValueFrom(this._storage.set(this._sessionInfoKey, sessionInfo));
  }

  public async isLoggedIn(): Promise<boolean> {
    const sessionInfo = await firstValueFrom(this._storage.get(this._sessionInfoKey));
    return !!sessionInfo;
  }

  public async logout(): Promise<void> {
    await firstValueFrom(this._storage.delete(this._sessionInfoKey));
    await this._rosenbrige.disconnect();
    await this._router.navigate(['/landing']);
  }

  public async getSessionInfo(): Promise<SessionInfoDTO> {
    return firstValueFrom(this._storage.get(this._sessionInfoKey) as Observable<SessionInfoDTO>);
  }

  public async genID(email: string): Promise<string> {
    return email;
  }
}
