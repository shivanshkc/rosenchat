import { Injectable } from '@angular/core';

import { RosenBridgeMessageDTO } from '../../core/models';
import { AbstractRosenBridgeService } from './rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenBridgeService implements AbstractRosenBridgeService {
  public async connect(address: string, userID: string): Promise<void> {
    console.debug('Inside RosenBridgeService.connect with address:', address, 'and userID:', userID);
  }

  public async disconnect(): Promise<void> {
    console.debug('Inside RosenBridgeService.disconnect');
  }

  public async listen(handler: (message: RosenBridgeMessageDTO) => Promise<void>): Promise<void> {
    console.debug('Inside RosenBridgeService.listen with handler:', handler);
  }

  public async send(message: RosenBridgeMessageDTO): Promise<void> {
    console.debug('Inside RosenBridgeService.send with message:', message);
  }
}
