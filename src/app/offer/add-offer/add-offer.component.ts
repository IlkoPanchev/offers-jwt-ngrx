import { Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import {AppConstants} from 'src/app/core/app-constants';
import { ApplicationState } from 'src/app/+store';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import {addOffer, addOfferSuccess} from '../../+store/actions/offer-actions'
import { ofType } from '@ngrx/effects';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnDestroy {

  destroySubscription$: Subject<boolean> = new Subject();
  form: FormGroup;
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
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
      year: ['', [Validators.required, Validators.min(1940)]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(10000000)]],
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('imageUrl')!.setValue(file);
    }
  }

  addOffer(): void {

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

    this.isLoading = true;

    this.store.dispatch(addOffer({data: formData}));

    this.actions$.pipe(
      ofType(addOfferSuccess),
      takeUntil(this.destroySubscription$)
    ).subscribe({
      next:() => {
        this.snackBarService.openSnackBar(AppConstants.OFFER_ADDED);
        this.router.navigate(['/offer/all-offers']);
      },
      error:(error) => console.log(error)
    })
    
  }




  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
