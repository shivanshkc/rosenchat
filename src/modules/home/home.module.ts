import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { routes } from './home.router';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(routes)],
})
export class HomeModule {}
