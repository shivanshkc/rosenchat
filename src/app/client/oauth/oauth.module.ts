import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { OAuthGoogleService } from './oauth-google.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [OAuthGoogleService],
})
export class OAuthModule {}
