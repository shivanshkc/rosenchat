import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { OAuthModule } from './client/oauth/oauth.module';
import { ConfigModule } from './common/config/config.module';
import { MaterialModule } from './common/material/material.module';
import { OnlyLoggedInGuard } from './guards/only-logged-in.guard';
import { OnlyLoggedOutGuard } from './guards/only-logged-out.guard';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { OauthCallbackComponent } from './pages/oauth-callback/oauth-callback.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [OnlyLoggedOutGuard],
  },
  // Home screen handles all operations on big screens.
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [OnlyLoggedInGuard],
  },
  // Chat-List screen is available only on small screens (< 768px), and shows the list of all chats.
  {
    path: 'chats',
    component: ChatListComponent,
    canActivate: [OnlyLoggedInGuard],
  },
  // Chat screen is available only on small screens (< 768px), and shows chat with the provided person.
  {
    path: 'chats/:username',
    component: ChatComponent,
    canActivate: [OnlyLoggedInGuard],
  },
  // OAuth Callback page is where all OAuth providers will redirect to.
  {
    path: 'auth/:provider/callback',
    component: OauthCallbackComponent,
    canActivate: [OnlyLoggedOutGuard],
  },
  // Landing screen handles all remaining routes.
  {
    path: '**',
    component: LandingComponent,
    canActivate: [OnlyLoggedOutGuard],
  },
];

@NgModule({
  declarations: [AppComponent, LandingComponent, HomeComponent, ChatListComponent, ChatComponent, OauthCallbackComponent],
  imports: [BrowserAnimationsModule, BrowserModule, ConfigModule, MaterialModule, OAuthModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
