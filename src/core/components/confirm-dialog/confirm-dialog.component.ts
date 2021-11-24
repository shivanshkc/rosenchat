import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogDataDTO } from '../../models';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogDataDTO) {}

  onConfirm(): void {
    this.data.callback?.(true);
  }

  onCancel(): void {
    this.data.callback?.(false);
  }
}
