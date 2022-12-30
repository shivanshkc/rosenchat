import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddUserDialogDataDTO } from '../../models';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AddUserDialogDataDTO) {}

  onConfirm(): void {
    this.data.callback(true);
  }

  onCancel(): void {
    this.data.callback(false);
  }
}
