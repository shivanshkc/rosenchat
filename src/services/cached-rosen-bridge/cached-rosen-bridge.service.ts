import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { firstValueFrom, toArray } from 'rxjs';

import { RBIncomingMessageDTO, RBInOutMessage, RBOutgoingMessageDTO } from '../../core/models';
import { AbstractAuthService } from '../auth/auth.abstract';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';
import { AbstractCachedRosenBridgeService } from './cached-rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class CachedRosenBridgeService implements AbstractCachedRosenBridgeService {
  private readonly _chatStorageKeyPrefix = 'chatStorage';

  constructor(
    private readonly _authService: AbstractAuthService,
    private readonly _rosenBridge: AbstractRosenBridgeService,
    private readonly _storage: StorageMap,
  ) {
    // This listener caches the incoming messages.
    this._rosenBridge.listen(async (message) => {
      const sessionInfo = await this._authService.getSessionInfo();
      const key = `${this._chatStorageKeyPrefix}:${sessionInfo.id}:${message.sender_id}`;

      const chatMessages = ((await firstValueFrom(this._storage.get(key))) as RBInOutMessage[]) || [];
      chatMessages.push(message);

      await firstValueFrom(this._storage.set(key, chatMessages));
    });
  }

  public async getChatMessages(userID: string): Promise<RBInOutMessage[]> {
    const sessionInfo = await this._authService.getSessionInfo();
    const key = `${this._chatStorageKeyPrefix}:${sessionInfo.id}:${userID}`;

    return ((await firstValueFrom(this._storage.get(key))) as RBInOutMessage[]) || [];
  }

  public async getLastMessage(userID: string): Promise<RBInOutMessage | undefined> {
    const sessionInfo = await this._authService.getSessionInfo();
    const key = `${this._chatStorageKeyPrefix}:${sessionInfo.id}:${userID}`;

    const messages = (await firstValueFrom(this._storage.get(key))) as RBInOutMessage[];
    if (!messages || messages.length === 0) {
      return undefined;
    }

    return messages[messages.length - 1];
  }

  public async addChat(userID: string): Promise<void> {
    const sessionInfo = await this._authService.getSessionInfo();
    const key = `${this._chatStorageKeyPrefix}:${sessionInfo.id}:${userID}`;

    await firstValueFrom(this._storage.set(key, []));
  }

  public async getChatList(): Promise<string[]> {
    const sessionInfo = await this._authService.getSessionInfo();

    const allKeys: string[] = await firstValueFrom(this._storage.keys().pipe(toArray()));
    const allOwnChatStorageKeys = allKeys.filter((key) => {
      return key.includes(this._chatStorageKeyPrefix) && key.includes(sessionInfo.id);
    });

    return allOwnChatStorageKeys.map((key) => key.slice(key.lastIndexOf(':') + 1));
  }

  public async connect(address: string, userID: string): Promise<void> {
    return this._rosenBridge.connect(address, userID);
  }

  public async disconnect(): Promise<void> {
    return this._rosenBridge.disconnect();
  }

  public listen(handler: (message: RBIncomingMessageDTO) => void): void {
    return this._rosenBridge.listen(handler);
  }

  public async send(message: RBOutgoingMessageDTO): Promise<void> {
    const sessionInfo = await this._authService.getSessionInfo();
    const key = `${this._chatStorageKeyPrefix}:${sessionInfo.id}:${message.receiver_ids[0]}`;

    await this._rosenBridge.send(message);

    const chatMessages = ((await firstValueFrom(this._storage.get(key))) as RBInOutMessage[]) || [];
    chatMessages.push(message);
    await firstValueFrom(this._storage.set(key, chatMessages));
  }
}
