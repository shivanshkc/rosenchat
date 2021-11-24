import { Component, HostListener, Input } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
import { AbstractLoggerService } from '../../../../services/logger/logger.abstract';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  @Input() public profileInfo: ProfileInfoDTO | undefined;

  constructor(
    public readonly chatMeta: AbstractChatMetaStoreService,
    public readonly rosenBridge: AbstractCachedRosenBridgeService,
    private readonly _log: AbstractLoggerService,
  ) {}

  public onBackClick(): void {
    this.chatMeta.setCurrentActiveChat('');
  }

  public onMenuClick(): void {
    this._log.info({ snack: true }, 'Features coming soon...');
  }

  // Below members are to get screen resize updates.
  private _screenWidth: number = window.screen.width;

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this._screenWidth = (event.target as Window).screen.width;
  }

  public isSmallScreen(): boolean {
    return this._screenWidth <= 991;
  }
}
