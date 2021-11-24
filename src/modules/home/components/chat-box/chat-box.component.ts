import { Component, HostListener, Input } from '@angular/core';

import { ProfileInfoDTO } from '../../../../core/models';
import { AbstractChatMetaStoreService } from '../../../../services/chat-meta-store/chat-meta-store.abstract';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  @Input() public profileInfo: ProfileInfoDTO | undefined;

  constructor(public readonly chatMeta: AbstractChatMetaStoreService) {}

  public onBackClick(): void {
    this.chatMeta.setCurrentActiveChat('');
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
