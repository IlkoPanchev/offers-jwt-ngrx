import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './+store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+store/effects/user-effects';
import { metaReducers } from './+store/meta-reducers';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ErrorComponent } from './shared/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { OffersEffects } from './+store/effects/offers-effects';
import { OfferEffects } from './+store/effects/offer-effects';



@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([UserEffects, OffersEffects, OfferEffects]),
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule.forRoot()
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
