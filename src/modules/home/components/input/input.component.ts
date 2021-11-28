import { Component, EventEmitter, Output } from '@angular/core';

import { RosenBridgeMessageDTO } from '../../../../core/models';
import { tc } from '../../../../core/utils';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
import { AbstractLoggerService } from '../../../../services/logger/logger.abstract';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public mainInput = '';
  @Output() outMessageEvent = new EventEmitter<RosenBridgeMessageDTO>();

  constructor(
    private readonly _log: AbstractLoggerService,
    private readonly _authService: AbstractAuthService,
    private readonly _chatMetaStore: AbstractChatMetaStoreService,
    private readonly _cachedRosenBridge: AbstractCachedRosenBridgeService,
  ) {}

  public async onEnter(): Promise<void> {
    const currentChat = this._chatMetaStore.getCurrentActiveChat();
    // If no chat is active, input does nothing.
    if (!currentChat || !this.mainInput) {
      return;
    }

    // Preparing the Message DTO.
    const currentUserID = (await this._authService.getSessionInfo()).id;
    const message: RosenBridgeMessageDTO = {
      content: this.mainInput,
      receiverIDs: [currentChat],
      senderID: currentUserID,
      sentAtMS: Date.now(),
    };

    // Emptying the input component.
    this.mainInput = '';
    this.outMessageEvent.emit(message);

    // Sending the message to RosenBridge.
    const [err] = await tc(this._cachedRosenBridge.send(message));
    if (err) {
      this._log.error({ snack: true }, err.message);
    }
  }
}
