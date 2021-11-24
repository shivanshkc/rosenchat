import { Injectable } from '@angular/core';

import { AbstractChatMetaStoreService } from './chat-meta-store.abstract';

@Injectable({
  providedIn: 'root',
})
export class ChatMetaStoreService implements AbstractChatMetaStoreService {
  private _tempVar = '';

  public getCurrentActiveChat(): string {
    console.debug('Inside ChatMetaStoreService.getCurrentActiveChat');
    return this._tempVar;
  }

  public setCurrentActiveChat(id: string): void {
    console.debug('Inside ChatMetaStoreService.setCurrentActiveChat with ID:', id);
    this._tempVar = id;
  }

  public getUnreadCount(id: string): number {
    console.debug('Inside ChatMetaStoreService.getUnreadCount with ID:', id);
    return 12;
  }

  public incrementUnreadCount(id: string, amount: number): void {
    console.debug('Inside ChatMetaStoreService.incrementUnreadCount with ID:', id, 'and amount:', amount);
  }
}
