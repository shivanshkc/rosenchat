import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private duration = 2500;

  constructor(private snackbar: MatSnackBar) {}

  public success(message: string): void {
    this.alert(message, 'check', 'primary');
  }

  public info(message: string): void {
    this.alert(message, 'info', 'primary');
  }

  public warn(message: string): void {
    this.alert(message, 'warning', 'accent');
  }

  public error(message: string): void {
    this.alert(message, 'error', 'warn');
  }

  private alert(message: string, iconName: string, color: string): void {
    const data = { iconName, message, color };

    this.snackbar.openFromComponent(SnackbarComponent, { data, duration: this.duration, horizontalPosition: 'left' });
  }
}
