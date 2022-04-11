import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Subject, takeUntil, tap} from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { loginUser, loginUserFailure } from 'src/app/+store/actions/user-actions';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

  destroySubscription$: Subject<boolean> = new Subject();
  form: FormGroup;
  loginFailure: boolean = false;
  isLoading: boolean = false;
  loginIcon: any = faUserCheck;

  constructor(
    private fb: FormBuilder,
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onKey(): void {
    this.loginFailure = false;
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.store.dispatch(loginUser(this.form.value));

    this.actions$.pipe(
      ofType(loginUserFailure),
      takeUntil(this.destroySubscription$),
      tap((error) => {
        console.log(error);
        this.loginFailure = true;
      })
    ).subscribe();

  }


  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
