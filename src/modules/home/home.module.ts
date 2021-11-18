import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbstractChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.abstract';
import { ChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.service';
import { AbstractProfileStoreService } from '../../services/profile-store/profile-store.abstract';
import { ProfileStoreService } from '../../services/profile-store/profile-store.service';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './home.component';
import { routes } from './home.router';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  providers: [
    { provide: AbstractChatMetaStoreService, useClass: ChatMetaStoreService },
    { provide: AbstractProfileStoreService, useClass: ProfileStoreService },
  ],
})
export class HomeModule {}
