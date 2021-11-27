import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

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
  @Input() inputEvents: Subject<RosenBridgeMessageDTO> | undefined;

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
    const allMessages = await this._rosenBridge.getChatMessages(this.profileInfo.id);
    if (allMessages.length === 0) {
      return;
    }
    const lastMessage = allMessages[allMessages.length - 1];

    this.unreadCount = await this._chatMeta.getUnreadCount(otherID);
    await this._setLastMessagePreview(lastMessage);
    await this._setLastMessageTime(lastMessage);

    this._rosenBridge.listen(async (message) => {
      this.unreadCount = await this._chatMeta.getUnreadCount(otherID);
      await this._setLastMessagePreview(message);
      await this._setLastMessageTime(message);
    });

    this.inputEvents?.subscribe(async (message) => {
      await this._setLastMessagePreview(message);
      await this._setLastMessageTime(message);
    });
  }

  private async _setLastMessagePreview(message: RosenBridgeMessageDTO): Promise<void> {
    const ownID = (await this._authService.getSessionInfo()).id;
    this.lastMessagePreview = (message.senderID === ownID ? 'You: ' : '') + message.content || '';
  }

  private async _setLastMessageTime(message: RosenBridgeMessageDTO): Promise<void> {
    this.lastMessageTime = this._timeFormatter.elapsedTimePretty(new Date(message.sentAtMS));
  }
}
