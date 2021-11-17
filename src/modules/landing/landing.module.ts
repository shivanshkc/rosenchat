import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './landing.component';
import { routes } from './landing.router';

@NgModule({
  declarations: [LandingComponent],
  imports: [MaterialModule, RouterModule.forChild(routes)],
})
export class LandingModule {}
