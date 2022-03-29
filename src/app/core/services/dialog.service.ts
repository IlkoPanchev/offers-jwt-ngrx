import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openConfirmDialog(message: string): MatDialogRef<ConfirmDialogComponent, any> {

    const matDialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
      maxHeight: '100%',
      width: '400px',
      maxWidth: '100%',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
    });

    return matDialogRef;
  }
}
