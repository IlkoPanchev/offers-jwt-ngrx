import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { OfferService } from 'src/app/core/services/offer.service';
import { UserService } from 'src/app/core/services/user.service';
import { IOffer } from 'src/app/shared/interfaces/offer';
import { IPageResponse } from 'src/app/shared/interfaces/pageResponse';
import * as OffersActions from '../../+store/actions/offers-actions';
import{selectOffers } from '../../+store/selectors/selectors'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent  implements OnDestroy{
  
  destroySubscription$: Subject<boolean> = new Subject();
  // response$ = this.offerService.response$;
  response$: Observable<IPageResponse | undefined> | undefined;
  // response: IPageResponse | undefined;
 
  pageSize = 3;
  page = 1;
  count = 0;

  // get isLogged(): boolean {
  //   return this.userService.isLogged;
  // }

  // ngOnInit(): void {

  // }

  constructor(
    private offerService: OfferService,
    private userService: UserService,
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject
  ) {
    this.loadOffers();

    this.actions$.pipe(
      ofType(OffersActions.getAllOffersSuccess),
      takeUntil(this.destroySubscription$),
      tap(() => {
        this.response$ = this.store.select(selectOffers);
      })
    ).subscribe();

    // this.response$ = this.store.select(selectOffers);
  

  }

 

  handlePageChange(event: number): void {
    this.page = event;
    this.loadOffers();
  }

  loadOffers(): void {
    this.store.dispatch(
      OffersActions.getAllOffers({ page: this.page, pageSize: this.pageSize })
    );
    // this.offerService.loadOffersPagination(this.page, this.pageSize);
  }

  changePageSize(event: any): void {
    this.pageSize = event;
    this.page = 1;
    this.loadOffers();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
