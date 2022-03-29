import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent {

  constructor(
    public sbRef: MatSnackBarRef<InfoBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

}
