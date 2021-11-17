import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthCallbackComponent } from './auth-callback.component';
import { routes } from './auth-callback.router';

@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [RouterModule.forChild(routes)],
})
export class AuthCallbackModule {}
