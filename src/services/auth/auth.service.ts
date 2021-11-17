import { Injectable } from '@angular/core';

import { OAuthProvider } from '../../shared/enums';
import { SessionInfoDTO } from '../../shared/models';
import { AbstractAuthService } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AbstractAuthService {
  async startLogin(provider: OAuthProvider): Promise<void> {
    console.debug('Inside AuthService.provider with provider:', provider);
  }

  async finishLogin(provider: OAuthProvider, idToken: string): Promise<void> {
    console.debug('Inside AuthService.finishLogin with provider:', provider, 'and ID token:', idToken);
  }

  async isLoggedIn(): Promise<boolean> {
    console.debug('Inside AuthService.isLoggedIn');
    return false;
  }

  async logout(): Promise<void> {
    console.debug('Inside AuthService.logout');
  }

  async getSessionInfo(): Promise<SessionInfoDTO> {
    console.debug('Inside AuthService.getSessionInfo');
    throw new Error('implement me');
  }
}
