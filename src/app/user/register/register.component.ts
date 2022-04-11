import { Component, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { registerUser, registerUserFailure } from 'src/app/+store/actions/user-actions';
import { AppConstants } from 'src/app/core/app-constants';
import { sameValueAsFactory } from 'src/app/core/validators';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  form: FormGroup;
  destroySubscription$: Subject<boolean> = new Subject();
  registerFailureUsername: boolean = false;
  registerFailureEmail: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  registerIcon: any = faIdCard;

  constructor(
    private fb: FormBuilder,
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rePassword: [
        '',
        [
          Validators.required,
          sameValueAsFactory(
            () => this.form?.get('password'),
            this.destroySubscription$
          ),
        ],
      ],
    });
  }

  onKey(): void {
    this.registerFailureUsername = false;
    this.registerFailureUsername = false;
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.store.dispatch(registerUser(this.form.value));

    this.actions$.pipe(
      ofType(registerUserFailure),
      takeUntil(this.destroySubscription$),
      tap((error) => {
        console.log(error);
       if (error.error.message == AppConstants.USERNAME_TAKEN) {
            this.registerFailureUsername = true;
          }
          if (error.error.message == AppConstants.EMAIL_IN_USE) {
            this.registerFailureEmail = true;
          }

          this.errorMessage = error.error.message;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
