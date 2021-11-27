import { Component, Input, OnInit } from '@angular/core';

import { ProfileInfoDTO, RosenBridgeMessageDTO } from '../../../../core/models';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
import { TimeFormatterService } from '../../../../services/time-formatter/time-formatter.service';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.scss'],
})
export class ChatListItemComponent implements OnInit {
  @Input() profileInfo: ProfileInfoDTO | undefined;

  public allMessages: RosenBridgeMessageDTO[] = [];
  public lastMessagePreview = '';
  public lastMessageTime = '';
  public unreadCount = 0;

  constructor(
    private readonly _authService: AbstractAuthService,
    private readonly _chatMeta: AbstractChatMetaStoreService,
    private readonly _rosenBridge: AbstractCachedRosenBridgeService,
    private readonly _timeFormatter: TimeFormatterService,
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!this.profileInfo) {
      return;
    }

    const otherID = this.profileInfo.id;
    this.allMessages.push(...this._rosenBridge.getChatMessages(otherID));

    this.unreadCount = await this._chatMeta.getUnreadCount(otherID);
    await this._setLastMessagePreview();
    await this._setLastMessageTime();

    this._rosenBridge.listen(async (message) => {
      this.unreadCount = await this._chatMeta.getUnreadCount(otherID);
      this.allMessages.push(message);
      await this._setLastMessagePreview();
      await this._setLastMessageTime();
    });
  }

  private async _setLastMessagePreview(): Promise<void> {
    if (!this.profileInfo) {
      return;
    }
    if (this.allMessages.length === 0) {
      return;
    }

    const lastMessage = this.allMessages[this.allMessages.length - 1];
    const ownID = (await this._authService.getSessionInfo()).id;

    this.lastMessagePreview = (lastMessage.senderID === ownID ? 'You: ' : '') + lastMessage.content || '';
  }

  private async _setLastMessageTime(): Promise<void> {
    if (!this.profileInfo) {
      return;
    }
    if (this.allMessages.length === 0) {
      return;
    }

    const lastMessage = this.allMessages[this.allMessages.length - 1];
    this.lastMessageTime = this._timeFormatter.elapsedTimePretty(new Date(lastMessage.sentAtMS));
  }
}
