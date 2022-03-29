import { Injectable } from "@angular/core";
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';
  import { InfoBarComponent } from 'src/app/shared/info-bar/info-bar.component';



@Injectable()
export class SnackBarService{

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 3;
   
    
    constructor( private snackBar: MatSnackBar){

    }

    openSnackBar(message: string) {
        this.snackBar.openFromComponent(InfoBarComponent, {
          data: message,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
          panelClass: ['info-snackbar'],
        });
      }
}