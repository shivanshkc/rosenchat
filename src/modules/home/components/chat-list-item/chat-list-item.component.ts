import { Component, Input, OnInit } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { tc } from '../../../../core/utils';
import { AbstractLoggerService } from '../../../../services/logger/logger.abstract';
import { AbstractRosenchatService } from '../../../../services/rosenchat/rosenchat.abstract';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent implements OnInit {
  @Input() userID = '';

  public profileInfo: ProfileInfoDTO | undefined;

  constructor(private readonly _rosenchat: AbstractRosenchatService, private readonly _log: AbstractLoggerService) {}

  async ngOnInit(): Promise<void> {
    await this._pullProfileInfo();
  }

  private async _pullProfileInfo(): Promise<void> {
    const [err, profileInfo] = await tc(this._rosenchat.getProfileInfo(this.userID));
    if (err) {
      this._log.error({ snack: true }, err.message);
      return;
    }

    this.profileInfo = profileInfo;
  }
}
