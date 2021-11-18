import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';

import { HomeComponentLayoutMode as LayoutMode } from '../../core/enums';
import { AbstractChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.abstract';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('chatListOpenClose', [
      state(LayoutMode.ChatListOpen, style({ width: '100%' })),
      state(LayoutMode.BothOpen, style({ width: '33.333333%' })),
      state(LayoutMode.ChatBoxOpen, style({ width: '0' })),
      transition(`${LayoutMode.ChatListOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.1s')]),
      transition(`${LayoutMode.ChatBoxOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.1s')]),
      transition(`${LayoutMode.ChatListOpen} <=> ${LayoutMode.ChatBoxOpen}`, [animate('0.1s')]),
    ]),
    trigger('chatBoxOpenClose', [
      state(LayoutMode.ChatBoxOpen, style({ width: '100%' })),
      state(LayoutMode.BothOpen, style({ width: '66.6666667%' })),
      state(LayoutMode.ChatListOpen, style({ width: '0' })),
      transition(`${LayoutMode.ChatBoxOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.1s')]),
      transition(`${LayoutMode.ChatListOpen} <=> ${LayoutMode.BothOpen}`, [animate('0.1s')]),
      transition(`${LayoutMode.ChatBoxOpen} <=> ${LayoutMode.ChatListOpen}`, [animate('0.1s')]),
    ]),
  ],
})
export class HomeComponent {
  private _screenWidth: number = window.screen.width;

  constructor(private readonly _chatMetaStore: AbstractChatMetaStoreService) {}

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this._screenWidth = (event.target as Window).screen.width;
  }

  public isSmallScreen(): boolean {
    return this._screenWidth <= 768;
  }

  public getLayoutMode(): LayoutMode {
    if (!this.isSmallScreen()) {
      return LayoutMode.BothOpen;
    }
    const isAnyChatSelected = !!this._chatMetaStore.getCurrentActiveChat();
    return isAnyChatSelected ? LayoutMode.ChatBoxOpen : LayoutMode.ChatListOpen;
  }
}
