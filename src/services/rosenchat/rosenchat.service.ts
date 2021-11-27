import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { backendErrorCode2Message } from '../../core/maps';
import { BackendErrorDTO, BackendUserInfoDTO, ProfileInfoDTO } from '../../core/models';
import { tc } from '../../core/utils';
import { ConfigService } from '../../modules/config/config.service';
import { AbstractRosenchatService } from './rosenchat.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenchatService implements AbstractRosenchatService {
  constructor(private readonly _http: HttpClient, private readonly _conf: ConfigService) {}

  public async getProfileInfo(userID: string): Promise<ProfileInfoDTO> {
    const { backend } = await this._conf.get();
    const endpoint = `${backend.baseURL}/api/user/${userID}`;

    const [err, response] = await tc(firstValueFrom(this._http.get(endpoint)));
    if (err || !response) {
      const customCode = (err as unknown as BackendErrorDTO)?.error?.custom_code;
      throw new Error(backendErrorCode2Message[customCode] || 'Please try again later.');
    }

    const { data } = response as { data: BackendUserInfoDTO };
    return { id: data._id, email: data.email, firstName: data.first_name, lastName: data.last_name, pictureLink: data.picture_link };
  }
}
