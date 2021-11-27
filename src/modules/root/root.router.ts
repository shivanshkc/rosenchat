import { Routes } from '@angular/router';

import { OnlyLoggedInService } from '../../guards/only-logged-in.service';
import { OnlyLoggedOutService } from '../../guards/only-logged-out.service';

export const routes: Routes = [
  {
    path: 'landing',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('../landing/landing.module').then((m) => m.LandingModule),
    canActivate: [OnlyLoggedOutService],
  },
  {
    path: 'auth/callback',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('../auth-callback/auth-callback.module').then((m) => m.AuthCallbackModule),
    canActivate: [OnlyLoggedOutService],
  },
  {
    path: 'home',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
    canActivate: [OnlyLoggedInService],
  },
  { path: '**', redirectTo: 'home' },
];
