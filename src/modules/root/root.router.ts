import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('../landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'auth/callback',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('../auth-callback/auth-callback.module').then((m) => m.AuthCallbackModule),
  },
  {
    path: 'home',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: 'home' },
];
