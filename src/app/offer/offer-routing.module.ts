import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthActivate } from "../core/guards/auth.activate";
import { AddOfferComponent } from "./add-offer/add-offer.component";
import { EditOfferComponent } from "./edit-offer/edit-offer.component";
import { MyOffersComponent } from "./my-offers/my-offers.component";
import { OfferComponent } from "./offer/offer.component";
import { OffersComponent } from "./offers/offers.component";
import { SearchOfferComponent } from "./search-offer/search-offer.component";




const routes: Routes = [
    {
      path: 'all-offers',
      component: OffersComponent,
    },
    {
      path: 'search-offer',
      component: SearchOfferComponent,
    },
    {
      path: 'my-offers',
      component: MyOffersComponent,
      canActivate: [AuthActivate],
      data: {
        authenticationRequired: true,
        authenticationFailureRedirectUrl: '/user/login'
      }
    },
    {
      path: 'add',
      component: AddOfferComponent,
      canActivate: [AuthActivate],
      data: {
        authenticationRequired: true,
        authenticationFailureRedirectUrl: '/user/login'
      }
    },
    {
      path: 'edit/:offerId',
      component: EditOfferComponent,
      canActivate: [AuthActivate],
      data: {
        authenticationRequired: true,
        authenticationFailureRedirectUrl: '/user/login'
      }
    },
    {
      path: ':offerId',
      component: OfferComponent,
    }
   
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OfferRoutingModule { }