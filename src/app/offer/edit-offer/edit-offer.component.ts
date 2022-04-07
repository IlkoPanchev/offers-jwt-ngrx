import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { IOffer } from 'src/app/shared/interfaces/offer';
import { AppConstants } from 'src/app/core/app-constants';
import { ApplicationState } from 'src/app/+store';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import {
  editOffer,
  editOfferSuccess,
} from '../../+store/actions/offer-actions';
import { ofType } from '@ngrx/effects';


@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
})
export class EditOfferComponent implements OnDestroy {
  destroySubscription$: Subject<boolean> = new Subject();
  form: FormGroup;
  offer: IOffer | undefined;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService,
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject
  ) {
    this.form = this.fb.group({
      brand: ['', [Validators.required, Validators.maxLength(20)]],
      model: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      imageUrl: [''],
      year: ['', [Validators.required, Validators.min(1950)]],
      price: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10000000)],
      ],
    });

    this.getOffer();
  }


  

  getOffer(): void {
    this.id = this.activatedRoute.snapshot.params['offerId'];
    this.store
      .select((state) => state.offerState)
      .pipe(
        takeUntil(this.destroySubscription$),
        tap((offerState) => {
          this.offer = offerState.offer;
          this.fillFormWithExistingData();
        })
      )
      .subscribe({
        error: (error) => console.log(error),
      });

  }

  fillFormWithExistingData(): void {
    this.form.patchValue({ brand: this.offer?.brand });
    this.form.patchValue({ model: this.offer?.model });
    this.form.patchValue({ description: this.offer?.description });
    this.form.patchValue({ year: this.offer?.year });
    this.form.patchValue({ price: this.offer?.price });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imageUrl')!.setValue(file);
    }
  }

  editOffer(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('brand', this.form.get('brand')!.value);
    formData.append('model', this.form.get('model')!.value);
    formData.append('description', this.form.get('description')!.value);
    formData.append('imageUrl', this.form.get('imageUrl')!.value);
    formData.append('year', this.form.get('year')!.value);
    formData.append('price', this.form.get('price')!.value);

    this.store.dispatch(editOffer({ id: this.id, data: formData }));
    this.actions$
      .pipe(ofType(editOfferSuccess), 
      takeUntil(this.destroySubscription$))
      .subscribe({
        next: () => {
          this.snackBarService.openSnackBar(AppConstants.OFFER_UPDATED);
          this.router.navigate(['/offer/all-offers']);
        },
        error: (error) => {
          console.log(error);
        },
      });

  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
