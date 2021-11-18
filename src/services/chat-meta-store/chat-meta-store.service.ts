import { Injectable } from '@angular/core';

import { AbstractChatMetaStoreService } from './chat-meta-store.abstract';

@Injectable({
  providedIn: 'root',
})
export class ChatMetaStoreService implements AbstractChatMetaStoreService {
  public getCurrentActiveChat(): string {
    console.debug('Inside ChatMetaStoreService.getCurrentActiveChat');
    throw new Error('implement me');
  }

  public setCurrentActiveChat(id: string): void {
    console.debug('Inside ChatMetaStoreService.setCurrentActiveChat with ID:', id);
    throw new Error('implement me');
  }

  public getUnreadCount(id: string): number {
    console.debug('Inside ChatMetaStoreService.getUnreadCount with ID:', id);
    throw new Error('implement me');
  }

  public incrementUnreadCount(id: string, amount: number): void {
    console.debug('Inside ChatMetaStoreService.incrementUnreadCount with ID:', id, 'and amount:', amount);
  }
}
