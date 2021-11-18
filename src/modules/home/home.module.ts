import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractCachedRosenBridgeService } from '../../services/cached-rosen-bridge/cached-rosen-bridge.abstract';
import { CachedRosenBridgeService } from '../../services/cached-rosen-bridge/cached-rosen-bridge.service';
import { AbstractChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.abstract';
import { ChatMetaStoreService } from '../../services/chat-meta-store/chat-meta-store.service';
import { AbstractLoggerService } from '../../services/logger/logger.abstract';
import { LoggerService } from '../../services/logger/logger.service';
import { AbstractRosenBridgeService } from '../../services/rosen-bridge/rosen-bridge.abstract';
import { RosenBridgeService } from '../../services/rosen-bridge/rosen-bridge.service';
import { MaterialModule } from '../material/material.module';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { InputComponent } from './components/input/input.component';
import { HomeComponent } from './home.component';
import { routes } from './home.router';

@NgModule({
  declarations: [HomeComponent, ChatListComponent, ChatBoxComponent, InputComponent],
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule.forChild(routes)],
  providers: [
    { provide: AbstractAuthService, useClass: AuthService },
    { provide: AbstractChatMetaStoreService, useClass: ChatMetaStoreService },
    { provide: AbstractLoggerService, useClass: LoggerService },
    { provide: AbstractRosenBridgeService, useClass: RosenBridgeService },
    { provide: AbstractCachedRosenBridgeService, useClass: CachedRosenBridgeService },
  ],
})
export class HomeModule {}
