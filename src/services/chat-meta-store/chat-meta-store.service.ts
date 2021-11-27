import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { firstValueFrom } from 'rxjs';

import { AbstractChatMetaStoreService } from './chat-meta-store.abstract';

@Injectable({
  providedIn: 'root',
})
export class ChatMetaStoreService implements AbstractChatMetaStoreService {
  private readonly _unreadCountKey = 'unreadCount';
  private _currentChat = '';

  constructor(private readonly _storage: StorageMap) {}

  public getCurrentActiveChat(): string {
    return this._currentChat;
  }

  public setCurrentActiveChat(id: string): void {
    this._currentChat = id;
  }

  public async getUnreadCount(id: string): Promise<number> {
    const unreadCountMap = await this._getUnreadCountMap();
    return unreadCountMap.get(id) || 0;
  }

  public async incrementUnreadCount(id: string, amount: number): Promise<void> {
    const unreadCountMap = await this._getUnreadCountMap();
    unreadCountMap.set(id, (unreadCountMap.get(id) || 0) + amount);
    await firstValueFrom(this._storage.set(this._unreadCountKey, unreadCountMap));
  }

  private async _getUnreadCountMap(): Promise<Map<string, number>> {
    let unreadCountMap = (await firstValueFrom(this._storage.get(this._unreadCountKey))) as Map<string, number>;
    if (!unreadCountMap) {
      unreadCountMap = new Map();
      await firstValueFrom(this._storage.set(this._unreadCountKey, unreadCountMap));
    }
    return unreadCountMap;
  }
}
