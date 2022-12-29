import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { RBIncomingMessageDTO, RBInOutMessage, RBMessageDTO, RBOutgoingMessageDTO } from 'src/core/models';

import { tc } from '../../core/utils';
import { AbstractLoggerService } from '../logger/logger.abstract';
import { AbstractRosenBridgeService } from './rosen-bridge.abstract';

@Injectable({
  providedIn: 'root',
})
export class RosenBridgeService implements AbstractRosenBridgeService {
  private _conn: WebSocketSubject<RBMessageDTO<RBInOutMessage>> | undefined;
  private _isConnected = false;
  private _pingInterval: NodeJS.Timeout | undefined;
  private _pingIntervalMS = 55000;
  private _handlers: ((message: RBIncomingMessageDTO) => void)[] = [];

  constructor(private readonly _log: AbstractLoggerService) {}

  public async connect(address: string, userID: string): Promise<void> {
    if (this._isConnected) {
      return;
    }

    const connPromise = new Promise<void>((resolve, reject) => {
      const options: WebSocketSubjectConfig<RBMessageDTO<RBInOutMessage>> = {
        url: `${address}/api/bridge?client_id=${userID}`,
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
        this._conn?.next({} as unknown as RBMessageDTO<RBOutgoingMessageDTO>);
      }, this._pingIntervalMS);

      this._conn.subscribe((message) => {
        this._handlers.forEach((h) => h(message.message));
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

  public async listen(handler: (message: RBIncomingMessageDTO) => void): Promise<void> {
    this._handlers.push(handler);
  }

  public async send(message: RBOutgoingMessageDTO): Promise<void> {
    this._conn?.next({ type: 'OUTGOING_MESSAGE_REQ', request_id: `${Date.now()}`, message });
  }
}
