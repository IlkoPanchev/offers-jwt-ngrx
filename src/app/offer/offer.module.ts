import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers/offers.component';
import { OfferComponent } from './offer/offer.component';
import { OfferRoutingModule } from './offer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { SearchOfferComponent } from './search-offer/search-offer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgHttpLoaderModule } from 'ng-http-loader';




@NgModule({
  declarations: [
    OffersComponent,
    OfferComponent,
    OfferListItemComponent,
    AddOfferComponent,
    EditOfferComponent,
    MyOffersComponent,
    SearchOfferComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    OfferRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    NgHttpLoaderModule.forRoot()
  ],
  exports: [
    OfferComponent,
    OffersComponent,
    OfferListItemComponent,
    AddOfferComponent,
    EditOfferComponent,
    MyOffersComponent,
    SearchOfferComponent
  ]
})
export class OfferModule { }
