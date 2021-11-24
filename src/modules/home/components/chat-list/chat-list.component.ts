import { Component, HostListener, OnInit } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { tc } from '../../../../core/utils';
import { AbstractAuthService } from '../../../../services/auth/auth.abstract';
import { AbstractCachedRosenBridgeService } from '../../../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';
import { AbstractLoggerService } from '../../../../services/logger/logger.abstract';
import { AbstractRosenchatService } from '../../../../services/rosenchat/rosenchat.abstract';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  public title = 'rosenchat';

  public isLoading = false;
  public searchOrAddInput = '';
  public selfProfileInfo: ProfileInfoDTO | undefined;
  public chatListData: ProfileInfoDTO[] = [];

  private _screenWidth: number = window.screen.width;

  constructor(
    private readonly _authService: AbstractAuthService,
    private readonly _rosenBridge: AbstractCachedRosenBridgeService,
    public readonly chatMeta: AbstractChatMetaStoreService,
    private readonly _rosenchat: AbstractRosenchatService,
    private readonly _log: AbstractLoggerService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await Promise.all([this._setSelfProfileInfo(), this._setChatListData()]);
    this.isLoading = false;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this._screenWidth = (event.target as Window).screen.width;
  }

  public isSmallScreen(): boolean {
    return this._screenWidth <= 991;
  }

  public onAddClick(): void {}

  public onLogoutClick(): void {}

  private async _setSelfProfileInfo(): Promise<void> {
    const { id: userID } = this._authService.getSessionInfo();

    const [err, profileInfo] = await tc(this._rosenchat.getProfileInfo(userID));
    if (err) {
      this._log.error({ snack: true }, err.message);
      return;
    }

    this.selfProfileInfo = profileInfo;
  }

  private async _setChatListData(): Promise<void> {
    const promises: Promise<ProfileInfoDTO>[] = [];
    this._rosenBridge.getAllChats().forEach((userID: string) => {
      promises.push(this._rosenchat.getProfileInfo(userID));
    });

    const [err, allProfiles] = await tc(Promise.all(promises));
    if (err || !allProfiles) {
      this._log.error({ snack: true }, err?.message || 'Failed to load profiles.');
      return;
    }

    this.chatListData = allProfiles;
  }
}
