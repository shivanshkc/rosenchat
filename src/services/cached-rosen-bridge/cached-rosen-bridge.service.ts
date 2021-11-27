import { Injectable } from '@angular/core';

import { RosenBridgeMessageDTO } from '../../core/models';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';
import { AbstractCachedRosenBridgeService } from './cached-rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class CachedRosenBridgeService implements AbstractCachedRosenBridgeService {
  constructor(private readonly _rosenBridge: AbstractRosenBridgeService) {}

  public getChatMessages(userID: string): RosenBridgeMessageDTO[] {
    console.debug('Inside CachedRosenBridgeService.getChatMessages with userID:', userID);
    return [];
  }

  public clearCache(): void {
    console.debug('Inside CachedRosenBridgeService.clearCache');
  }

  public getLastMessage(userID: string): RosenBridgeMessageDTO {
    console.debug('Inside CachedRosenBridgeService.getLastMessage with userID:', userID);
    return { content: 'Dummy content', senderID: userID, sentAtMS: Date.now(), receiverIDs: ['shivanshID'] };
  }

  public addChat(userID: string): void {
    console.debug('Inside CachedRosenBridgeService.addChat with userID:', userID);
  }

  public getChatList(): string[] {
    console.debug('Inside CachedRosenBridgeService.getAllChats');
    return [];
  }

  public async connect(address: string, userID: string): Promise<void> {
    return this._rosenBridge.connect(address, userID);
  }

  public async disconnect(): Promise<void> {
    return this._rosenBridge.disconnect();
  }

  public listen(handler: (message: RosenBridgeMessageDTO) => Promise<void>): void {
    return this._rosenBridge.listen(handler);
  }

  public async send(message: RosenBridgeMessageDTO): Promise<void> {
    return this._rosenBridge.send(message);
  }
}
