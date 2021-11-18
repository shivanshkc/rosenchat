import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbstractChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.abstract';
import { ChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.service';
import { AbstractProfileStoreService } from '../../services/profile-store/profile-store.abstract';
import { ProfileStoreService } from '../../services/profile-store/profile-store.service';
import { MaterialModule } from '../material/material.module';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { InputComponent } from './components/input/input.component';
import { HomeComponent } from './home.component';
import { routes } from './home.router';

@NgModule({
  declarations: [HomeComponent, ChatListComponent, ChatBoxComponent, InputComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  providers: [
    { provide: AbstractChatMetaStoreService, useClass: ChatMetaStoreService },
    { provide: AbstractProfileStoreService, useClass: ProfileStoreService },
  ],
})
export class HomeModule {}
