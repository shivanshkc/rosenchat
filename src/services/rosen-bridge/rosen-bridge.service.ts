import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { RosenBridgeMessageDTO } from '../../core/models';
import { tc } from '../../core/utils';
import { AbstractLoggerService } from '../logger/logger.abstract';
import { AbstractRosenBridgeService } from './rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenBridgeService implements AbstractRosenBridgeService {
  private _conn: WebSocketSubject<RosenBridgeMessageDTO> | undefined;
  private _isConnected = false;
  private _pingInterval: NodeJS.Timeout | undefined;
  private _pingIntervalMS = 55000;
  private _handlers: ((message: RosenBridgeMessageDTO) => void)[] = [];

  constructor(private readonly _log: AbstractLoggerService) {}

  public async connect(address: string, userID: string): Promise<void> {
    if (this._isConnected) {
      return;
    }

    const connPromise = new Promise<void>((resolve, reject) => {
      const options: WebSocketSubjectConfig<RosenBridgeMessageDTO> = {
        url: `${address}/api/users/${userID}/connection`,
        openObserver: {
          next: () => resolve(),
          complete: () => resolve(),
          error: (e: unknown) => {
            reject(e);
            this._log.error({ snack: true }, e);
            this.disconnect();
          },
        },
        closeObserver: {
          next: () => this.disconnect(),
          complete: () => this.disconnect(),
          error: (e: unknown) => {
            reject(e);
            this._log.error({ snack: true }, e);
            this.disconnect();
          },
        },
      };

      console.info('RosenBridge connection in progress...');
      this._conn = webSocket(options);

      this._pingInterval = setInterval(() => {
        this._conn?.next({} as unknown as RosenBridgeMessageDTO);
      }, this._pingIntervalMS);

      this._conn.subscribe((message) => {
        console.info('Message from RosenBridge:', message);
        this._handlers.forEach((h) => h(message));
      });
    });

    const [err] = await tc(connPromise);
    if (err) {
      console.error('Failed to connect to RosenBridge:', err);
      throw err;
    }

    console.info('Connection is RosenBridge successful.');
  }

  public async disconnect(): Promise<void> {
    if (this._conn) {
      this._conn.complete();
      this._conn = undefined;
    }
    if (this._pingInterval) {
      clearInterval(this._pingInterval);
    }

    this._isConnected = false;
    this._log.info({ snack: true }, 'Disconnected from RosenBridge.');
  }

  public async listen(handler: (message: RosenBridgeMessageDTO) => void): Promise<void> {
    this._handlers.push(handler);
  }

  public async send(message: RosenBridgeMessageDTO): Promise<void> {
    console.info('Sending to Rosen:', message);

    const messageObj = { message: JSON.stringify(message), receivers: message.receiverIDs };
    this._conn?.next(messageObj as unknown as RosenBridgeMessageDTO);
  }
}
