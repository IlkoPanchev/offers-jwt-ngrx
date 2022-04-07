import { Component, OnDestroy } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { selectOffers, selectUser } from 'src/app/+store/selectors/selectors';
import { IPageResponse } from 'src/app/shared/interfaces/pageResponse';
import { getAllMyOffers, getAllMyOffersSuccess } from '../../+store/actions/offers-actions';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
})
export class MyOffersComponent implements OnDestroy {

  response$: Observable<IPageResponse | undefined> | undefined;
  destroySubscription$: Subject<boolean> = new Subject();

  id: number = 0;
  pageSize = 3;
  page = 1;
  count = 0;


  constructor(
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject
  ) {

    this.store.select(selectUser).pipe(
      takeUntil(this.destroySubscription$),
      tap((user) => (this.id = user.id))
    ).subscribe({
      error: (error) => console.log(error)
    });

    this.getMyOffers();

    this.actions$.pipe(
      ofType(getAllMyOffersSuccess),
      takeUntil(this.destroySubscription$),
      tap(() => {
        this.response$ = this.store.select(selectOffers);
      })
    ).subscribe()
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getMyOffers();
  }

  getMyOffers(): void {
    this.store.dispatch(
      getAllMyOffers({ userId: this.id, page: this.page, pageSize: this.pageSize })
    );
  }

  changePageSize(event: any): void {
    this.pageSize = event;
    this.page = 1;
    this.getMyOffers();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
