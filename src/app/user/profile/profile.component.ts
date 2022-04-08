import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { IUser } from 'src/app/shared/interfaces/user';
import { AppConstants } from 'src/app/core/app-constants';
import { ApplicationState } from 'src/app/+store';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { updateUserProfile, updateUserProfileFailure, updateUserProfileSuccess } from 'src/app/+store/actions/user-actions';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy {

  form!: FormGroup;
  inUpdateMode = false;
  isLoading = true;
  destroySubscription$: Subject<boolean> = new Subject();
  profileFailureEmail: boolean = false;
  errorMessage: string = '';
  user: IUser | undefined;


  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackBarService,
    private store: Store<ApplicationState>,
    private action$: ScannedActionsSubject
  ) {


    this.store.select((state) => state.userState).pipe(
      takeUntil(this.destroySubscription$),
      tap((userState) => {
        this.user = userState.user;
        this.isLoading = false}),
    ).subscribe();

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });


  }

  onKey(): void {
    this.profileFailureEmail = false;
  }


  editProfile(): void {
    this.inUpdateMode = true;
    this.form.patchValue({
      username: this.user?.username,
      email: this.user?.email,
      phone: this.user?.phone,
      address: this.user?.address
    });
  }

  updateProfile(): void {

    if (this.form.invalid) { return; }

    this.store.dispatch(updateUserProfile(this.form.value));

    this.action$.pipe(
      ofType(updateUserProfileSuccess),
      takeUntil(this.destroySubscription$),
      tap(() => {
        this.inUpdateMode = false;
        this.snackBarService.openSnackBar(AppConstants.PROFILE_UPDATED)
      })
    ).subscribe();


    this.action$.pipe(
      ofType(updateUserProfileFailure),
      takeUntil(this.destroySubscription$),
      tap((error) => {
        console.log(error);
        this.profileFailureEmail = true;
        this.errorMessage = error.error.message;
      })
    ).subscribe()
    
    // this.userService.updateProfile(this.form.value)
    //   .pipe(takeUntil(this.destroySubscription$))
    //   .subscribe({
    //     next: () => {
    //       this.inUpdateMode = false;
    //     },
    //     error: (err) => {
    //       this.profileFailureEmail = true;
    //       this.errorMessage = err.message;
    //     },
    //     complete: () => {
    //       this.snackBarService.openSnackBar(AppConstants.PROFILE_UPDATED)
    //     }
    //   })
  }


  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}






