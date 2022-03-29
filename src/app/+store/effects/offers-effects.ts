import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
import { OfferService } from 'src/app/core/services/offer.service';
import * as OffersActions from '../actions/offers-actions';

@Injectable()
export class OffersEffects {
  constructor(private actions$: Actions, private offerService: OfferService) {}

  getAllOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.getAllOffers),
      switchMap((action) =>
        this.offerService
          .loadOffersPagination(action.page, action.pageSize)
          .pipe(
            map((offers) => {
              return OffersActions.getAllOffersSuccess({ offers });
            }),
            catchError((error) => [
              OffersActions.getAllOffersFailure({ error }),
            ])
          )
      )
    )
  );

  getAllMyOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.getAllMyOffers),
      switchMap((action) =>
        this.offerService
          .loadOffersByUserPagination(
            action.userId,
            action.page,
            action.pageSize
          )
          .pipe(
            map((offers) => {
              return OffersActions.getAllMyOffersSuccess({ offers });
            }),
            catchError((error) => [
              OffersActions.getAllMyOffersFailure({ error }),
            ])
          )
      )
    )
  );

  searchOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.searchOffers),
      switchMap((action) =>
        this.offerService
          .loadOffersByKeywordPagination(
            action.keyword,
            action.page,
            action.pageSize
          )
          .pipe(
            map((offers) => {
              return OffersActions.searchOffersSuccess({ offers });
            }),
            catchError((error) => [OffersActions.searchOffersFailure({error})])
          )
      )
    )
  );
}
