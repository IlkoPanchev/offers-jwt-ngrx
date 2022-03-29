import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageSizeComponent } from './page-size/page-size.component';
import { FormsModule } from '@angular/forms';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { ImageWithLoaderComponent } from './image-with-loader/image-with-loader.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component'


@NgModule({
  declarations: [
    ErrorComponent,
    NotFoundComponent,
    PageSizeComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
    InfoBarComponent,
    ImageWithLoaderComponent,
    ScrollTopComponent
  
  ],
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule],
  exports: [
    ErrorComponent,
    NotFoundComponent,
    PageSizeComponent,
    InfoBarComponent,
    ImageWithLoaderComponent,
    ScrollTopComponent
  ],
})
export class SharedModule {}
