import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { ConfigModule } from '../config/config.module';
import { MaterialModule } from '../material/material.module';
import { RootComponent } from './root.component';

const routes: Routes = [];

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserAnimationsModule, BrowserModule, ConfigModule, MaterialModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {}
