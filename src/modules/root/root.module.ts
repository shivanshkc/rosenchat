import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../../environments/environment';
import { AbstractAuthService } from '../../services/auth/auth.abstract';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractLoggerService } from '../../services/logger/logger.abstract';
import { LoggerService } from '../../services/logger/logger.service';
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
  providers: [
    { provide: AbstractAuthService, useClass: AuthService },
    { provide: AbstractLoggerService, useClass: LoggerService },
  ],
  bootstrap: [RootComponent],
})
export class RootModule {}
