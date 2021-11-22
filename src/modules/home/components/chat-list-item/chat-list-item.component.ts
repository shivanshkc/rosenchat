import { Component, Input, OnInit } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { tc } from '../../../../core/utils';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
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

  constructor(
    private readonly _authService: AbstractAuthService,
    public readonly chatMeta: AbstractChatMetaStoreService,
    public readonly rosenBridge: AbstractCachedRosenBridgeService,
    private readonly _rosenchat: AbstractRosenchatService,
    private readonly _log: AbstractLoggerService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._pullProfileInfo();
  }

  public wasLastMessageOutgoing(): boolean {
    const { senderID } = this.rosenBridge.getLastMessage(this.userID);
    return senderID === this._authService.getSessionInfo().id;
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
