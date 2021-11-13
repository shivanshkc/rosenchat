import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}
