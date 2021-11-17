import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RootComponent } from './root.component';
import { routes } from './root.router';

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserAnimationsModule, BrowserModule, RouterModule.forRoot(routes), SharedModule],
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {}
