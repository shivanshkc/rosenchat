import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { routes } from './landing.router';

@NgModule({
  declarations: [LandingComponent],
  imports: [RouterModule.forChild(routes)],
})
export class LandingModule {}
