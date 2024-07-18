import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { firstValueFrom } from 'rxjs';

import { BackendErrorDTO, BackendUserInfoDTO, ProfileInfoDTO, SessionInfoDTO } from '../../core/models';
import { tc } from '../../core/utils';
import { ConfigService } from '../../modules/config/config.service';
import { AuthService } from '../auth/auth.service';
import { AbstractRosenchatService } from './rosenchat.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenchatService implements AbstractRosenchatService {
  private readonly _profileInfoKeyPrefix = 'profileInfo';

  constructor(
    private readonly _auth: AuthService,
    private readonly _http: HttpClient,
    private readonly _conf: ConfigService,
    private readonly _storage: StorageMap,
  ) {}

  public async getProfileInfo(userID: string): Promise<ProfileInfoDTO> {
    const key = `${this._profileInfoKeyPrefix}:${userID}`;
    let profile = (await firstValueFrom(this._storage.get(key))) as ProfileInfoDTO;
    if (profile) {
      return profile;
    }

    const sessionInfo = (await this._auth.getSessionInfo()) as SessionInfoDTO;
    const headers = { Authorization: sessionInfo.idToken };

    const { backend } = await this._conf.get();
    const endpoint = `${backend.baseURL}/api/user/${userID}`;

    const [err, response] = await tc(firstValueFrom(this._http.get(endpoint, { headers })));
    if (err || !response) {
      const reason = (err as unknown as BackendErrorDTO)?.error?.reason;
      throw new Error(reason || 'Please try again later.');
    }

    const data = response as BackendUserInfoDTO;
    profile = { email: data.email, firstName: data.first_name, lastName: data.last_name, pictureLink: data.picture_link };
    await firstValueFrom(this._storage.set(key, profile));

    return profile;
  }
}
