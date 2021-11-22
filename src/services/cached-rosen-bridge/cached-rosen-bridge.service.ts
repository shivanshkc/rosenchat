import { Injectable } from '@angular/core';

import { RosenBridgeMessageDTO } from '../../core/models';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';
import { AbstractCachedRosenBridgeService } from './cached-rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class CachedRosenBridgeService implements AbstractCachedRosenBridgeService {
  constructor(private readonly _rosenBridge: AbstractRosenBridgeService) {}

  public clearCache(): void {
    console.debug('Inside CachedRosenBridgeService.clearCache');
  }

  public getLastMessage(userID: string): RosenBridgeMessageDTO {
    console.debug('Inside CachedRosenBridgeService.getLastMessage with userID:', userID);
    return { content: 'Dummy content', senderID: 'a', sentAtMS: new Date('11:00 22 nov 2021').getTime(), receiverIDs: ['dummy ID'] };
  }

  public addChat(userID: string): void {
    console.debug('Inside CachedRosenBridgeService.addChat with userID:', userID);
  }

  public getAllChats(): string[] {
    console.debug('Inside CachedRosenBridgeService.getAllChats');
    return ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'];
  }

  public async connect(address: string, userID: string): Promise<void> {
    return this._rosenBridge.connect(address, userID);
  }

  public async disconnect(): Promise<void> {
    return this._rosenBridge.disconnect();
  }

  public async listen(handler: (message: RosenBridgeMessageDTO) => Promise<void>): Promise<void> {
    return this._rosenBridge.listen(handler);
  }

  public async send(message: RosenBridgeMessageDTO): Promise<void> {
    return this._rosenBridge.send(message);
  }
}
