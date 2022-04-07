import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthActivate } from './guards/auth.activate';
import { UserService } from './services/user.service';
import { appInterceptorProvider } from './app-interceptor';
import { globalErrorHandlerProvider } from './error-handler';
import { OfferService } from './services/offer.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from './services/snackbar.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DialogService } from './services/dialog.service';
import { appErrorInterceptorProvider } from './app-error-interceptor';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent],
  providers: [
    AuthActivate,
    UserService,
    OfferService,
    SnackBarService,
    DialogService,
    appErrorInterceptorProvider,
    appInterceptorProvider,
   
    globalErrorHandlerProvider,
   
  ],
})
export class CoreModule {}
