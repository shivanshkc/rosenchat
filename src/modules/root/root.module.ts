import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { RootComponent } from './root.component';
import { routes } from './root.router';

const serviceWorkerModule = ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  registrationStrategy: 'registerWhenStable:30000',
});

@NgModule({
  declarations: [RootComponent],
  imports: [BrowserAnimationsModule, BrowserModule, RouterModule.forRoot(routes), SharedModule, serviceWorkerModule],
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {}
