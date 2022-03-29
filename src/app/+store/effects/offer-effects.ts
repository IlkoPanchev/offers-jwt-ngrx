import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs';
import { OfferService } from 'src/app/core/services/offer.service';
import * as OfferActions from '../../+store/actions/offer-actions';

@Injectable()
export class OfferEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private offerService: OfferService
  ) {}

  getOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.getOffer),
      switchMap((action) =>
        this.offerService.getOffer(action.id).pipe(
          map((offer) => {
            return OfferActions.getOfferSuccess({ offer });
          }),
          catchError((error) => [OfferActions.getOfferFailure({ error })])
        )
      )
    )
  );

  deleteOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.deleteOffer),
      switchMap((action) =>
        this.offerService.deleteOffer(action.id).pipe(
          map(() => {
            return OfferActions.deleteOfferSuccess();
          }),
          catchError((error) => [OfferActions.deleteOfferFailure({ error })])
        )
      )
    )
  );

  addOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.addOffer),
      switchMap((action) =>
        this.offerService.addOffer(action.data).pipe(
          map((offer) => {
            return OfferActions.addOfferSuccess({ offer });
          }),
          catchError((error) => [OfferActions.addOfferFailure({ error })])
        )
      )
    )
  );

  editOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.editOffer),
      switchMap((action) =>
        this.offerService.editOffer(action.id, action.data).pipe(
          map((offer) => {
            return OfferActions.editOfferSuccess({ offer });
          }),
          catchError((error) => [OfferActions.editOfferFailure({ error })])
        )
      )
    )
  );
}
