import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ProfileInfoDTO, RosenBridgeMessageDTO } from '../../../../core/models';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
import { AbstractLoggerService } from '../../../../services/logger/logger.abstract';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input() public profileInfo: ProfileInfoDTO | undefined;
  @Input() inputEvents: Subject<RosenBridgeMessageDTO> | undefined;
  @Input() chatSelectEvents: Subject<ProfileInfoDTO> | undefined;

  public allMessages: RosenBridgeMessageDTO[] = [];

  constructor(
    public readonly chatMeta: AbstractChatMetaStoreService,
    private readonly _rosenBridge: AbstractCachedRosenBridgeService,
    private readonly _log: AbstractLoggerService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.chatSelectEvents?.subscribe(async (profile) => {
      this.profileInfo = profile;

      this.allMessages = await this._rosenBridge.getChatMessages(this.profileInfo.id);
      this._rosenBridge.listen((message) => {
        this.allMessages.push(message);
      });

      this.inputEvents?.subscribe(async (message) => {
        this.allMessages.push(message);
      });
    });
  }

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
