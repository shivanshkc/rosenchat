import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { RootComponent } from './root.component';
import { routes } from './root.router';

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserAnimationsModule, BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {}
