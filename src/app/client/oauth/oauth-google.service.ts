import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { firstValueFrom } from 'rxjs';

import { ConfigService } from '../../common/config/config.service';
import { IOAuthService, IUserInfo } from './oauth.interface';

@Injectable()
export class OAuthGoogleService implements IOAuthService {
  constructor(private conf: ConfigService, private http: HttpClient) {}

  async code2Token(code: string): Promise<string> {
    const { oauth } = await this.conf.get();
    const redirectURL = `${window.origin}/${oauth.redirectURL}`;

    const body = {
      code,
      client_id: oauth.googleClientID,
      // Todo: This parameter should not be hardcoded.
      client_secret: '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',
      redirect_uri: redirectURL,
      grant_type: 'authorization_code',
    };

    const response = (await firstValueFrom(this.http.post(oauth.googleTokenURL, body))) as { id_token: string };
    return response.id_token;
  }

  async redirect(): Promise<void> {
    const { oauth } = await this.conf.get();
    const redirectURL = `${window.origin}/${oauth.redirectURL}`;

    window.location.href =
      `${oauth.googleAuthURL}?` +
      `scope=${oauth.googleScope}&` +
      `include_granted_scopes=true&` +
      `response_type=code&` +
      `redirect_uri=${redirectURL}&` +
      `client_id=${oauth.googleClientID}`;
  }

  async token2UserInfo(token: string): Promise<IUserInfo> {
    // Todo: Check the authenticity of this token with Google's public key.
    const decodedToken = jwtDecode(token) as {
      email: string;
      given_name: string;
      family_name: string;
      picture: string;
    };

    return {
      email: decodedToken.email,
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name,
      photoURL: decodedToken.picture,
    };
  }
}
