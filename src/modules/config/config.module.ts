import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ConfigService } from './config.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [ConfigService],
})
export class ConfigModule {}
