import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { OnlyLoggedInGuard } from './guards/only-logged-in.guard';
import { OnlyLoggedOutGuard } from './guards/only-logged-out.guard';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  // Home screen handles all operations on big screens.
  { path: 'home', component: HomeComponent, canActivate: [OnlyLoggedInGuard] },
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
  // Landing screen handles all remaining routes.
  {
    path: '**',
    component: LandingComponent,
    canActivate: [OnlyLoggedOutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
