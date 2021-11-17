import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AbstractAuthService } from '../../services/auth/auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './landing.component';
import { routes } from './landing.router';

@NgModule({
  declarations: [LandingComponent],
  imports: [MaterialModule, RouterModule.forChild(routes)],
  providers: [{ provide: AbstractAuthService, useClass: AuthService }],
})
export class LandingModule {}
