import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCardModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatCardModule],
})
export class MaterialModule {}
