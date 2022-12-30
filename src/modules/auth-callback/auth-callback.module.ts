import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractLoggerService } from '../../services/logger/logger.abstract';
import { LoggerService } from '../../services/logger/logger.service';
import { AuthCallbackComponent } from './auth-callback.component';
import { routes } from './auth-callback.router';

@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [RouterModule.forChild(routes)],
  providers: [
    { provide: AbstractAuthService, useClass: AuthService },
    { provide: AbstractLoggerService, useClass: LoggerService },
  ],
})
export class AuthCallbackModule {}
