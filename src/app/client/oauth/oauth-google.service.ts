import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt from 'jsrsasign';
import { firstValueFrom } from 'rxjs';

import { ConfigService } from '../../common/config/config.service';
import { IOAuthService, UserInfoDTO } from './oauth.interface';

@Injectable()
export class OAuthGoogleService implements IOAuthService {
  public readonly providerName = 'google';

  // Todo: This parameter should not be hardcoded.
  private static readonly cs = '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';

  private static publicKeyJSON: Record<string, string> = {};
  private static publicKeyExpires = Date.now() / 1000;

  constructor(private conf: ConfigService, private http: HttpClient) {}

  async code2Token(code: string): Promise<string> {
    const { oauth } = await this.conf.get();
    const redirectURL = `${window.origin}/${oauth.googleRedirectURL}`;

    const body = {
      code,
      client_id: oauth.googleClientID,
      client_secret: OAuthGoogleService.cs,
      redirect_uri: redirectURL,
      grant_type: 'authorization_code',
    };

    const response = (await firstValueFrom(this.http.post(oauth.googleTokenURL, body))) as { id_token: string };
    return response.id_token;
  }

  async redirect(): Promise<void> {
    const { oauth } = await this.conf.get();
    const redirectURL = `${window.origin}/${oauth.googleRedirectURL}`;

    window.location.href =
      `${oauth.googleAuthURL}?` +
      `scope=${oauth.googleScope}&` +
      `include_granted_scopes=true&` +
      `response_type=code&` +
      `redirect_uri=${redirectURL}&` +
      `client_id=${oauth.googleClientID}`;
  }

  async token2UserInfo(token: string): Promise<UserInfoDTO> {
    // Todo: Check the authenticity of this token with Google's public key.
    const decoded = jwt.KJUR.jws.JWS.parse(token);
    const payload = decoded.payloadObj as {
      email: string;
      given_name: string;
      family_name: string;
      picture: string;
    };

    return {
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture,
    };
  }

  async isTokenValid(token: string): Promise<boolean> {
    if (OAuthGoogleService.publicKeyExpires <= Date.now()) {
      await this.refreshPublicKey();
    }

    const decoded = jwt.KJUR.jws.JWS.parse(token);
    const kID = (decoded?.headerObj as { kid?: string })?.kid;
    if (!kID) {
      throw new Error();
    }

    const publicKeyStr = OAuthGoogleService.publicKeyJSON[kID];
    const publicKey = jwt.KEYUTIL.getKey(publicKeyStr);

    return jwt.KJUR.jws.JWS.verifyJWT(token, publicKey as jwt.RSAKey, { alg: ['RS256'] });
  }

  private async refreshPublicKey(): Promise<void> {
    const { oauth } = await this.conf.get();

    const response = await firstValueFrom(this.http.get(oauth.googlePublicKeyURL, { observe: 'response' }));
    if (!response) {
      throw new Error();
    }

    OAuthGoogleService.publicKeyJSON = response.body as Record<string, string>;
    const cacheControl = response.headers.get('cache-control');
    if (!cacheControl) {
      // Todo: warning.
      return;
    }

    const maxAgeNumStart = cacheControl.indexOf('max-age=') + 'max-age='.length;
    const maxAgeNumStr = cacheControl.slice(maxAgeNumStart);

    const maxAge = parseInt(maxAgeNumStr, 10);
    OAuthGoogleService.publicKeyExpires = Date.now() + maxAge - 300;
  }
}
