import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfigModule } from './common/config/config.module';
import { MaterialModule } from './common/material/material.module';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [AppComponent, LandingComponent, HomeComponent, ChatListComponent, ChatComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule, ConfigModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
