import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthCallbackComponent } from './auth-callback.component'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [{ path: '**', component: AuthCallbackComponent }]

@NgModule({
  declarations: [
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthCallbackModule { }
