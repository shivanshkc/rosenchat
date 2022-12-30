import { Pipe, PipeTransform } from '@angular/core';

import { ProfileInfoDTO } from '../core/models';

@Pipe({
  name: 'chatListFilter',
})
export class ChatListFilterPipe implements PipeTransform {
  transform(value: ProfileInfoDTO[], arg: string): ProfileInfoDTO[] {
    if (!arg) {
      return value;
    }

    return value.filter((elem) => {
      return (
        elem.email.toLowerCase().indexOf(arg) !== -1 ||
        elem.firstName.toLowerCase().indexOf(arg) !== -1 ||
        elem.lastName.toLowerCase().indexOf(arg) !== -1
      );
    });
  }
}
