import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { firstValueFrom, toArray } from 'rxjs';

import { RosenBridgeMessageDTO } from '../../core/models';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';
import { AbstractCachedRosenBridgeService } from './cached-rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class CachedRosenBridgeService implements AbstractCachedRosenBridgeService {
  private readonly _chatStorageKeyPrefix = 'chatStorage';

  constructor(private readonly _rosenBridge: AbstractRosenBridgeService, private readonly _storage: StorageMap) {
    // This listener caches the incoming messages.
    this._rosenBridge.listen(async (message) => {
      const key = `${this._chatStorageKeyPrefix}${message.senderID}`;
      const chatMessages = ((await firstValueFrom(this._storage.get(key))) as RosenBridgeMessageDTO[]) || [];
      chatMessages.push(message);
      await firstValueFrom(this._storage.set(key, chatMessages));
    });
  }

  public async getChatMessages(userID: string): Promise<RosenBridgeMessageDTO[]> {
    const key = `${this._chatStorageKeyPrefix}${userID}`;
    return ((await firstValueFrom(this._storage.get(key))) as RosenBridgeMessageDTO[]) || [];
  }

  public async clearCache(): Promise<void> {
    const delPromises = (await this.getChatList()).map((key) => {
      return firstValueFrom(this._storage.delete(key));
    });

    await Promise.all(delPromises);
  }

  public async getLastMessage(userID: string): Promise<RosenBridgeMessageDTO | undefined> {
    const key = `${this._chatStorageKeyPrefix}${userID}`;
    const messages = (await firstValueFrom(this._storage.get(key))) as RosenBridgeMessageDTO[];

    if (!messages || messages.length === 0) {
      return undefined;
    }

    return messages[messages.length - 1];
  }

  public async addChat(userID: string): Promise<void> {
    const key = `${this._chatStorageKeyPrefix}${userID}`;
    await firstValueFrom(this._storage.set(key, []));
  }

  public async getChatList(): Promise<string[]> {
    const allKeys: string[] = await firstValueFrom(this._storage.keys().pipe(toArray()));
    return allKeys.filter((key) => key.startsWith(this._chatStorageKeyPrefix)).map((key) => key.slice(this._chatStorageKeyPrefix.length));
  }

  public async connect(address: string, userID: string): Promise<void> {
    return this._rosenBridge.connect(address, userID);
  }

  public async disconnect(): Promise<void> {
    return this._rosenBridge.disconnect();
  }

  public listen(handler: (message: RosenBridgeMessageDTO) => void): void {
    return this._rosenBridge.listen(handler);
  }

  public async send(message: RosenBridgeMessageDTO): Promise<void> {
    const key = `${this._chatStorageKeyPrefix}${message.receiverIDs[0]}`;
    const chatMessages = ((await firstValueFrom(this._storage.get(key))) as RosenBridgeMessageDTO[]) || [];
    chatMessages.push(message);
    await firstValueFrom(this._storage.set(key, chatMessages));

    return this._rosenBridge.send(message);
  }
}
