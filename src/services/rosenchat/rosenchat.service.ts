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

    await sleep(2000);

    const names = ['Shivansh', 'Mayank', 'Vyom', 'Vidit', 'Sagar'];
    const randomName = names[Math.floor(Math.random() * names.length)];

    return { id: userID, email: 'shivanshbox@gmail.com', firstName: randomName, lastName: 'Kuchchal', pictureLink: 'https://picsum.photos/200/200' };
  }
}
