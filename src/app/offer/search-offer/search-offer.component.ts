import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { selectOffers } from 'src/app/+store/selectors/selectors';
import { IPageResponse } from 'src/app/shared/interfaces/pageResponse';
import { searchOffers, searchOffersSuccess } from '../../+store/actions/offers-actions';

@Component({
  selector: 'app-search-offer',
  templateUrl: './search-offer.component.html',
  styleUrls: ['./search-offer.component.scss'],
})
export class SearchOfferComponent implements OnDestroy {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  destroySubscription$: Subject<boolean> = new Subject();
  response$: Observable<IPageResponse | undefined> | undefined;
  inSearchMode: boolean = false;
  pageSize = 3;
  page = 1;
  count = 0;
  keyword: string = '';

  constructor(
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject
  ) {}

  searchOffers(): void {
    this.inSearchMode = true;
    this.store.dispatch(
      searchOffers({
        keyword: this.keyword,
        page: this.page,
        pageSize: this.pageSize,
      })
    );

    this.actions$.pipe(
      ofType(searchOffersSuccess),
      takeUntil(this.destroySubscription$),
      tap(() => {
        this.response$ = this.store.select(selectOffers);
      })
    ).subscribe()
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.searchOffers();
  }

  changePageSize(event: any): void {
    this.pageSize = event;
    this.page = 1;
    this.searchOffers();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
