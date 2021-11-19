import { Component, OnInit } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { tc } from '../../../../core/utils';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
import { AbstractLoggerService } from '../../../../services/logger/logger.abstract';
import { AbstractRosenchatService } from '../../../../services/rosenchat/rosenchat.abstract';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  public title = 'rosenchat';

  public searchOrAddInput = '';
  public selfProfileInfo: ProfileInfoDTO | undefined;

  constructor(
    private readonly _authService: AbstractAuthService,
    private readonly _rosenchat: AbstractRosenchatService,
    private readonly _log: AbstractLoggerService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._pullProfileInfo();
  }

  public onAddClick(): void {}

  public onLogoutClick(): void {}

  private async _pullProfileInfo(): Promise<void> {
    const { id: userID } = this._authService.getSessionInfo();

    const [err, profileInfo] = await tc(this._rosenchat.getProfileInfo(userID));
    if (err) {
      this._log.error({ snack: true }, err.message);
      return;
    }

    this.selfProfileInfo = profileInfo;
  }
}
