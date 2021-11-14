import { Injectable } from '@angular/core';

import { IOAuthService } from '../client/oauth/oauth.interface';
import { OAuthGoogleService } from '../client/oauth/oauth-google.service';

export interface UserSessionDTO {
  // Identifier.
  email: string;

  // Display info.
  firstName: string;
  lastName: string;
  picture: string;

  // Auth info.
  provider: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private readonly userInfoKey = 'user_info';

  constructor(private readonly oAuthGoogle: OAuthGoogleService) {}

  public putSessionInfo(info: UserSessionDTO): void {
    localStorage.setItem(this.userInfoKey, JSON.stringify(info));
  }

  public getSessionInfo(): UserSessionDTO | null {
    const info = localStorage.getItem(this.userInfoKey);
    if (!info) {
      return null;
    }

    try {
      return JSON.parse(info);
    } catch (err) {
      return null;
    }
  }

  public removeSessionInfo(): void {
    localStorage.removeItem(this.userInfoKey);
  }

  public async isSessionValid(): Promise<boolean> {
    const info = this.getSessionInfo();
    if (!info) {
      return false;
    }

    let oAuthHandler: IOAuthService;
    if (info.provider === this.oAuthGoogle.providerName) {
      oAuthHandler = this.oAuthGoogle;
    } else {
      return false;
    }

    return oAuthHandler.isTokenValid(info.accessToken);
  }
}
