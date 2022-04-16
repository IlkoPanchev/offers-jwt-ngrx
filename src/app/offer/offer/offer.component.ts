import { Component, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { IUser } from 'src/app/shared/interfaces';
import { AppConstants } from 'src/app/core/app-constants';
import { IOffer } from 'src/app/shared/interfaces/offer';
import { ApplicationState } from 'src/app/+store';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import {
  getOffer,
  deleteOfferSuccess,
  deleteOffer,
  getOfferSuccess,
} from '../../+store/actions/offer-actions';
import { ofType } from '@ngrx/effects';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnDestroy {
  user: IUser | null | undefined;
  offer: IOffer | undefined;
  id!: number;
  destroySubscription$: Subject<boolean> = new Subject();
  readMore: boolean = false;
  isDetailsPage: boolean = true;

  constructor(
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject,
    private dialogService: DialogService
  ) {
    
    this.id = this.activatedRoute.snapshot.params['offerId'];

    this.store
      .select((state) => state.offersState)
      .pipe(
        takeUntil(this.destroySubscription$),
        map((offerState) => offerState.offers),
        map((offersResponse) => offersResponse!.content),
        map((offersArr) => offersArr.filter((offer) => offer.id == this.id)[0]),
        tap((offer) => {
          this.store.dispatch(getOfferSuccess({ offer }));
          this.offer = offer;
        })
      )
      .subscribe();

    this.getUser();
  }

  getUser(): void {
    this.store
      .select((state) => state.userState)
      .pipe(
        takeUntil(this.destroySubscription$),
        tap((userState) => (this.user = userState.user))
      )
      .subscribe({
        error: (error) => console.log(error),
      });
  }

  getOffer(): void {
    this.store.dispatch(getOffer({ id: this.id }));
  }

  deleteOffer(): void {
    this.zone.run(() => {
      
      const dialogRef = this.dialogService.openConfirmDialog(AppConstants.DELETE_CONFIRM);

      dialogRef
        .afterClosed()
        .pipe(
          takeUntil(this.destroySubscription$),
          tap((confirmed: boolean) => {
            if (confirmed) {
              this.store.dispatch(deleteOffer({ id: this.id }));
            }
          }),
          switchMap(() => {
            return this.actions$.pipe(ofType(deleteOfferSuccess));
          })
        )
        .subscribe({
          next: () => {
            this.snackBarService.openSnackBar(AppConstants.OFFER_DELETED);
            this.router.navigate(['/offer/all-offers']);
          },
          error: (error) => console.log(error),
        });
    });
  }

 
  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
  }
}
