import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import jwtDecode from 'jwt-decode';
import { firstValueFrom, Observable } from 'rxjs';

import { OAuthProvider } from '../../core/enums';
import { SessionInfoDTO } from '../../core/models';
import { ConfigService } from '../../modules/config/config.service';
import { AbstractAuthService } from './auth.abstract';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AbstractAuthService {
  private readonly _sessionInfoKey = 'sessionInfo';

  constructor(private readonly _conf: ConfigService, private readonly _storage: StorageMap, private readonly _router: Router) {}

  public async startLogin(provider: OAuthProvider): Promise<void> {
    const { backend } = await this._conf.get();
    window.location.href = `${backend.baseURL}/api/auth/${provider}`;
    ``;
  }

  public async finishLogin(provider: OAuthProvider, idToken: string): Promise<void> {
    const { email } = jwtDecode(idToken) as { email: string };
    const id = await AuthService._sha256Hex(email);

    const sessionInfo: SessionInfoDTO = { id, email, provider, idToken };
    await firstValueFrom(this._storage.set(this._sessionInfoKey, sessionInfo));
  }

  public async isLoggedIn(): Promise<boolean> {
    const sessionInfo = await firstValueFrom(this._storage.get(this._sessionInfoKey));
    return !!sessionInfo;
  }

  public async logout(): Promise<void> {
    console.info('Hit!');
    await firstValueFrom(this._storage.delete(this._sessionInfoKey));
    await this._router.navigate(['/landing']);
  }

  public async getSessionInfo(): Promise<SessionInfoDTO> {
    return firstValueFrom(this._storage.get(this._sessionInfoKey) as Observable<SessionInfoDTO>);
  }

  private static async _sha256Hex(input: string): Promise<string> {
    // Encoding as UTF-8.
    const buffer = new TextEncoder().encode(input);

    // Hashing the message.
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

    // Converting ArrayBuffer to Array.
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Converting bytes to hex string.
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
