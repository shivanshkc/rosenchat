import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  exports: [MatToolbarModule, MatButtonModule, MatSnackBarModule, MatIconModule],
})
export class MaterialModule {}
