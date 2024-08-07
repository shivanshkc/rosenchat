import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ProfileInfoDTO, RBIncomingMessageDTO, RBInOutMessage, RBOutgoingMessageDTO } from '../../../../core/models';
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
  @Input() inMessageEvent: Subject<RBIncomingMessageDTO> | undefined;
  @Input() outMessageEvent: Subject<RBOutgoingMessageDTO> | undefined;
  @Input() chatSelectEvent: Subject<ProfileInfoDTO> | undefined;

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
    if (this.profileInfo) {
      this.unreadCount = await this._chatMeta.getUnreadCount(this.profileInfo.email);

      const allMessages = await this._rosenBridge.getChatMessages(this.profileInfo.email);
      if (allMessages.length !== 0) {
        const lastMessage = allMessages[allMessages.length - 1];
        await this._setLastMessagePreview(lastMessage);
        await this._setLastMessageTime(lastMessage);
      }
    }

    // Updating unread count on chat-selects.
    this.chatSelectEvent?.subscribe(async (selected: ProfileInfoDTO) => {
      if (!this.profileInfo || this.profileInfo.email !== selected.email) {
        return;
      }
      this.unreadCount = 0;
      await this._chatMeta.setUnreadCount(this.profileInfo.email, this.unreadCount);
    });

    // Updating last message preview on input events.
    this.outMessageEvent?.subscribe(async (message) => {
      if (!this.profileInfo || message.receiver_ids[0] !== this.profileInfo.email) {
        return;
      }
      await this._setLastMessagePreview(message);
      await this._setLastMessageTime(message);
    });

    this.inMessageEvent?.subscribe(async (message) => {
      if (!this.profileInfo || this.profileInfo.email !== message.sender_id) {
        return;
      }

      if (this._chatMeta.getCurrentActiveChat() !== this.profileInfo.email) {
        this.unreadCount++;
        await this._chatMeta.setUnreadCount(this.profileInfo.email, this.unreadCount);
      }

      await this._setLastMessagePreview(message);
      await this._setLastMessageTime(message);
    });
  }

  private async _setLastMessagePreview(message: RBInOutMessage): Promise<void> {
    const ownID = (await this._authService.getSessionInfo()).email;
    this.lastMessagePreview = (message.sender_id === ownID ? 'You: ' : '') + message.message || '';
  }

  private async _setLastMessageTime(message: RBInOutMessage): Promise<void> {
    this.lastMessageTime = this._timeFormatter.elapsedTimePretty(new Date(message.sentAtMS));
  }
}
