import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ProfileInfoDTO, RBIncomingMessageDTO, RBInOutMessage, RBOutgoingMessageDTO } from '../../../../core/models';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
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
  @Input() inMessageEvent: Subject<RBIncomingMessageDTO> | undefined;
  @Input() outMessageEvent: Subject<RBOutgoingMessageDTO> | undefined;
  @Input() chatSelectEvent: Subject<ProfileInfoDTO> | undefined;

  public allMessages: RBInOutMessage[] = [];

  constructor(
    private readonly _authService: AbstractAuthService,
    public readonly chatMeta: AbstractChatMetaStoreService,
    private readonly _rosenBridge: AbstractCachedRosenBridgeService,
    private readonly _log: AbstractLoggerService,
  ) {}

  async ngOnInit(): Promise<void> {
    const ownID = (await this._authService.getSessionInfo()).email;

    this.chatSelectEvent?.subscribe(async (profile) => {
      this.profileInfo = profile;
      this.allMessages = await this._rosenBridge.getChatMessages(this.profileInfo.email);
    });

    this.outMessageEvent?.subscribe(async (message) => {
      if (message.sender_id === this.profileInfo?.email || message.sender_id === ownID) {
        this.allMessages.push(message);
      }
    });

    this.inMessageEvent?.subscribe(async (message) => {
      // If no chat is active or the message is not for the active chat then do nothing.
      if (!this.profileInfo || message.sender_id !== this.profileInfo.email) {
        return;
      }
      if (message.sender_id === ownID) {
        console.info('Message to self (😢)');
        return;
      }
      // Push the message to the chat box.
      this.allMessages.push(message);
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
