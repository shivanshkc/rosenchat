import { Injectable } from '@angular/core';

import { ProfileInfoDTO } from '../../core/models';
import { AbstractRosenchatService } from './rosenchat.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenchatService implements AbstractRosenchatService {
  public async getProfileInfo(userID: string): Promise<ProfileInfoDTO> {
    console.debug('Inside RosenchatService.getProfileInfo with User ID:', userID);
    return { id: userID, email: 'shivanshbox@gmail.com', firstName: 'Shivansh', lastName: 'Kuchchal', pictureLink: 'https://picsum.photos/200/200' };
  }
}
