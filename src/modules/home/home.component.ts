import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { HomeComponentLayoutMode as LayoutMode } from '../../core/enums';
import { ProfileInfoDTO, RosenBridgeMessageDTO } from '../../core/models';
import { tc } from '../../core/utils';
import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AbstractCachedRosenBridgeService } from '../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.abstract';
import { LoggerService } from '../../services/logger/logger.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('chatListOpenClose', [
      state(LayoutMode.ChatListOpen, style({ width: '100%' })),
      state(LayoutMode.BothOpen, style({ width: '33.333333%' })),
      state(LayoutMode.ChatBoxOpen, style({ width: '0' })),
      transition(`${LayoutMode.ChatListOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.2s 75ms ease-out')]),
      transition(`${LayoutMode.ChatBoxOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.2s 75ms ease-out')]),
      transition(`${LayoutMode.ChatListOpen} <=> ${LayoutMode.ChatBoxOpen}`, [animate('0.2s 75ms ease-out')]),
    ]),
    trigger('chatBoxOpenClose', [
      state(LayoutMode.ChatBoxOpen, style({ width: '100%' })),
      state(LayoutMode.BothOpen, style({ width: '66.6666667%' })),
      state(LayoutMode.ChatListOpen, style({ width: '0' })),
      transition(`${LayoutMode.ChatBoxOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.2s 75ms ease-out')]),
      transition(`${LayoutMode.ChatListOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.2s 75ms ease-out')]),
      transition(`${LayoutMode.ChatBoxOpen} <=> ${LayoutMode.ChatListOpen}`, [animate('0.2s 75ms ease-out')]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  // This variable is assigned when the chatSelect event is received from the ChatList component.
  public currentProfileInfo: ProfileInfoDTO | undefined;
  public inputEvents: Subject<RosenBridgeMessageDTO> = new Subject<RosenBridgeMessageDTO>();
  public chatSelectEvents: Subject<ProfileInfoDTO> = new Subject<ProfileInfoDTO>();

  constructor(
    private readonly _conf: ConfigService,
    private readonly _log: LoggerService,
    private readonly _authService: AbstractAuthService,
    private readonly _chatMetaStore: AbstractChatMetaStoreService,
    private readonly _rosenbridge: AbstractCachedRosenBridgeService,
  ) {}

  async ngOnInit(): Promise<void> {
    const { bridge } = await this._conf.get();
    const sessionInfo = await this._authService.getSessionInfo();

    const [err] = await tc(this._rosenbridge.connect(bridge.baseURL, sessionInfo.id));
    if (err) {
      this._log.error({ snack: true }, err?.message || err);
    }
  }

  public getLayoutMode(): LayoutMode {
    if (!this.isSmallScreen()) {
      return LayoutMode.BothOpen;
    }
    const isAnyChatSelected = !!this._chatMetaStore.getCurrentActiveChat();
    return isAnyChatSelected ? LayoutMode.ChatBoxOpen : LayoutMode.ChatListOpen;
  }

  public onChatSelect(selected: ProfileInfoDTO): void {
    this.currentProfileInfo = selected;
    this.chatSelectEvents.next(selected);
  }

  public onSendEvent(message: RosenBridgeMessageDTO): void {
    this.inputEvents.next(message);
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
