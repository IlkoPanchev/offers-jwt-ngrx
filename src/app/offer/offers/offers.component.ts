import { Component, OnDestroy } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
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
  response$: Observable<IPageResponse | undefined> | undefined;

 
  pageSize = 3;
  page = 1;
  count = 0;


  constructor(
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

  
  }


  handlePageChange(event: number): void {
    this.page = event;
    this.loadOffers();
  }

  loadOffers(): void {
    this.store.dispatch(
      OffersActions.getAllOffers({ page: this.page, pageSize: this.pageSize })
    );
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
