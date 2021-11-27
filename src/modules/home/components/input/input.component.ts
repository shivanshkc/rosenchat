import { Component } from '@angular/core';

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

  constructor(
    private readonly _log: AbstractLoggerService,
    private readonly _authService: AbstractAuthService,
    private readonly _chatMetaStore: AbstractChatMetaStoreService,
    private readonly _cachedRosenBridge: AbstractCachedRosenBridgeService,
  ) {}

  public async onEnter(): Promise<void> {
    const currentChat = this._chatMetaStore.getCurrentActiveChat();
    if (!currentChat) {
      return;
    }

    const currentUserID = (await this._authService.getSessionInfo()).id;
    const message: RosenBridgeMessageDTO = {
      content: this.mainInput,
      receiverIDs: [currentChat],
      senderID: currentUserID,
      sentAtMS: Date.now(),
    };

    // The mainInput is reset immediately. If there's any error,
    // it should be shown elsewhere and not in the input field.
    this.mainInput = '';

    const [err] = await tc(this._cachedRosenBridge.send(message));
    if (err) {
      this._log.error({ snack: true }, err.message);
    }
  }
}
