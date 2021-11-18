import { Injectable } from '@angular/core';

import { ProfileInfoDTO } from '../../core/models';
import { AbstractProfileStoreService } from './profile-store.abstract';

@Injectable({
  providedIn: 'root',
})
export class ProfileStoreService implements AbstractProfileStoreService {
  public getProfileInfo(id: string): void {
    console.debug('Inside ProfileStoreService.getProfileInfo with ID:', id);
  }

  public setProfileInfo(info: ProfileInfoDTO): void {
    console.debug('Inside ProfileStoreService.setProfileInfo with info:', info);
  }
}
