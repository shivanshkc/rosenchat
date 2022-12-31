import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'landing',
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    loadChildren: () => import('src/app/modules/landing/landing.module').then((m) => m.LandingModule)
    // canActivate: [MustBeLoggedOutService],
  },
  {
    path: 'auth/callback',
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    loadChildren: () => import('src/app/modules/auth-callback/auth-callback.module').then((m) => m.AuthCallbackModule)
    // canActivate: [MustBeLoggedOutService],
  },
  {
    path: 'home',
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    loadChildren: () => import('src/app/modules/home/home.module').then((m) => m.HomeModule)
    // canActivate: [MustBeLoggedInService],
  },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
