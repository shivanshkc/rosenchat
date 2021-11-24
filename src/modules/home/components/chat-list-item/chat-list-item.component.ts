import { Component, Input } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
import { TimeFormatterService } from '../../../../services/time-formatter/time-formatter.service';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent {
  @Input() profileInfo: ProfileInfoDTO | undefined;

  constructor(
    private readonly _authService: AbstractAuthService,
    public readonly chatMeta: AbstractChatMetaStoreService,
    public readonly rosenBridge: AbstractCachedRosenBridgeService,
    private readonly _timeFormatter: TimeFormatterService,
  ) {}

  public wasLastMessageOutgoing(): boolean {
    if (!this.profileInfo) {
      return false;
    }

    const { senderID } = this.rosenBridge.getLastMessage(this.profileInfo.id);
    return senderID === this._authService.getSessionInfo().id;
  }

  public formatTime(): string {
    if (!this.profileInfo) {
      return '...';
    }

    const lastMessageDate = new Date(this.rosenBridge.getLastMessage(this.profileInfo.id).sentAtMS);
    return this._timeFormatter.elapsedTimePretty(lastMessageDate);
  }

  public temp(): boolean {
    if (!this.profileInfo) {
      return true;
    }

    const unreadCount = this.chatMeta.getUnreadCount(this.profileInfo.id);
    console.log('Count:', this.profileInfo.id, unreadCount, typeof unreadCount);
    return this.profileInfo ? unreadCount === 0 : true;
  }
}
