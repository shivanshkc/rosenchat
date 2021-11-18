import { Component } from '@angular/core';

import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public mainInput = '';

  constructor(private readonly _chatMetaStore: AbstractChatMetaStoreService) {}

  public onEnter(): void {
    const currentChat = this._chatMetaStore.getCurrentActiveChat();
    if (!currentChat) {
    }

    // Handle the input with AbstractCachedRosenBridgeService.
  }
}
