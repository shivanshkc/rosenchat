import { Injectable } from '@angular/core';

import { ProfileInfoDTO } from '../../core/models';
import { sleep } from '../../core/utils';
import { AbstractRosenchatService } from './rosenchat.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenchatService implements AbstractRosenchatService {
  public async getProfileInfo(userID: string): Promise<ProfileInfoDTO> {
    console.debug('Inside RosenchatService.getProfileInfo with User ID:', userID);

    await sleep(500);

    const name = userID.slice(0, userID.length - 2);
    return { id: userID, email: `${name}@gmail.com`, firstName: name, lastName: 'Doe', pictureLink: 'https://picsum.photos/200/200' };
  }
}
