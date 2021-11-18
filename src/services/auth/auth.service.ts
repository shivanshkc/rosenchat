import { Injectable } from '@angular/core';

import { OAuthProvider } from '../../core/enums';
import { SessionInfoDTO } from '../../core/models';
import { AbstractAuthService } from './auth.abstract';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AbstractAuthService {
  public async startLogin(provider: OAuthProvider): Promise<void> {
    console.debug('Inside AuthService.provider with provider:', provider);
  }

  public async finishLogin(provider: OAuthProvider, idToken: string): Promise<void> {
    console.debug('Inside AuthService.finishLogin with provider:', provider, 'and ID token:', idToken);
  }

  public async isLoggedIn(): Promise<boolean> {
    console.debug('Inside AuthService.isLoggedIn');
    return false;
  }

  public async logout(): Promise<void> {
    console.debug('Inside AuthService.logout');
  }

  public getSessionInfo(): SessionInfoDTO {
    console.debug('Inside AuthService.getSessionInfo');
    throw new Error('implement me');
  }
}
