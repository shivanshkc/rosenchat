import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatSnackBarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule],
  exports: [MatToolbarModule, MatButtonModule, MatSnackBarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule {}
