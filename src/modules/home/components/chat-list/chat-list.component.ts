import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddUserDialogComponent } from '../../../../core/components/add-user-dialog/add-user-dialog.component';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { AddUserDialogDataDTO, ConfirmDialogDataDTO, ProfileInfoDTO } from '../../../../core/models';
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

  @Output() chatSelect = new EventEmitter<ProfileInfoDTO>();

  constructor(
    private readonly _authService: AbstractAuthService,
    private readonly _rosenBridge: AbstractCachedRosenBridgeService,
    public readonly chatMeta: AbstractChatMetaStoreService,
    private readonly _rosenchat: AbstractRosenchatService,
    private readonly _log: AbstractLoggerService,
    private readonly _dialog: MatDialog,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await Promise.all([this._setSelfProfileInfo(), this._setChatListData()]);
    this.isLoading = false;
  }

  public async onAddClick(): Promise<void> {
    if (!this.searchOrAddInput) {
      return;
    }

    const userID = this.searchOrAddInput;
    this.searchOrAddInput = '';

    this.isLoading = true;
    const [errProfile, profile] = await tc(this._rosenchat.getProfileInfo(userID));
    this.isLoading = false;
    if (errProfile) {
      this._log.error({ snack: true }, errProfile?.message);
      return;
    }
    if (!profile) {
      this._log.warn({ snack: true }, 'This user does not exist in our records.');
      return;
    }

    const isPositive = await new Promise<boolean>((resolve) => {
      const data: AddUserDialogDataDTO = { profile, callback: resolve };
      this._dialog.open(AddUserDialogComponent, { data, width: '400px' });
    });

    if (!isPositive) {
      return;
    }

    this._rosenBridge.addChat(this.searchOrAddInput);
    this.searchOrAddInput = '';
  }

  public async onLogoutClick(): Promise<void> {
    const isPositive = await new Promise<boolean>((resolve) => {
      const data: ConfirmDialogDataDTO = { callback: resolve, message: 'Please confirm logout.' };
      this._dialog.open(ConfirmDialogComponent, { data, width: '400px' });
    });

    if (!isPositive) {
      return;
    }

    await this._authService.logout();
  }

  public onChatClick(info: ProfileInfoDTO): void {
    this.chatMeta.setCurrentActiveChat(info.id);
    this.chatSelect.emit(info);
  }

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
