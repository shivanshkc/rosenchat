import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { SnackBarComponent } from '../../core/components/snack-bar/snack-bar.component';
import { LoggingOptionsDTO, SnackBarDataDTO } from '../../core/models';
import { AbstractLoggerService } from './logger.abstract';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements AbstractLoggerService {
  private readonly _snackBarDurationMS = 2500;

  constructor(private readonly _snackBar: MatSnackBar) {}

  public debug(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void {
    if (options.snack) {
      this._openSnackBar({ message: message + optionalParams.join(' '), color: 'primary', icon: 'description' });
    }
    console.debug(message, ...optionalParams);
  }

  public success(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void {
    if (options.snack) {
      this._openSnackBar({ message: message + optionalParams.join(' '), color: 'primary', icon: 'check' });
    }
    console.info(message, ...optionalParams);
  }

  public info(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void {
    if (options.snack) {
      this._openSnackBar({ message: message + optionalParams.join(' '), color: 'primary', icon: 'info' });
    }
    console.info(message, ...optionalParams);
  }

  public warn(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void {
    if (options.snack) {
      this._openSnackBar({ message: message + optionalParams.join(' '), color: 'accent', icon: 'warning' });
    }
    console.warn(message, ...optionalParams);
  }

  public error(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void {
    if (options.snack) {
      this._openSnackBar({ message: message + optionalParams.join(' '), color: 'warn', icon: 'error' });
    }
    console.error(message, ...optionalParams);
  }

  /**
   * @description _openSnackBar opens the snackbar.
   *
   * @param data         Data allows snackBar customizations.
   * @param data.message Message is the message
   * @param data.icon    Icon is the name of the icon that will be shown in the snackbar.
   * @param data.color   Color is for the theming of the snackbar.
   * @private
   */
  private _openSnackBar(data: SnackBarDataDTO): void {
    const config: MatSnackBarConfig = { data, duration: this._snackBarDurationMS, horizontalPosition: 'left' };
    this._snackBar.openFromComponent(SnackBarComponent, config);
  }
}
