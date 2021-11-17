import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractLoggerService } from '../../services/logger/logger.abstract';
import { LoggerService } from '../../services/logger/logger.service';
import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './landing.component';
import { routes } from './landing.router';

@NgModule({
  declarations: [LandingComponent],
  imports: [MaterialModule, RouterModule.forChild(routes)],
  providers: [
    { provide: AbstractAuthService, useClass: AuthService },
    { provide: AbstractLoggerService, useClass: LoggerService },
  ],
})
export class LandingModule {}
