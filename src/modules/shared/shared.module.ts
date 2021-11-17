import { NgModule } from '@angular/core';

import { SnackBarComponent } from '../../core/components/snack-bar/snack-bar.component';
import { ConfigModule } from '../config/config.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SnackBarComponent],
  imports: [ConfigModule, MaterialModule],
})
export class SharedModule {}
