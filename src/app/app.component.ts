import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ApplicationState } from './+store';
import { getUserProfileInfo, getUserProfileInfoFailure } from './+store/actions/user-actions';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // get isAuthenticating(): boolean{
  //   return this.userService.user === undefined;
  // }

  isAuthenticating: boolean = true;



  constructor(private userService: UserService,
    private router: Router,
    private store: Store<ApplicationState>,
    private actions$: ScannedActionsSubject) {

    // this.userService.getProfileInfo().subscribe({
    //   error: (error) => {
    //     console.log(error)
    //     this.userService.user = null;
    //     this.router.navigate(['/home']);
    //   }
    // });

    this.store.dispatch(getUserProfileInfo());

    this.store.select((state) => state.userState)
      .pipe(
        tap((userState) => {
          if (userState.user !== undefined) {
            this.isAuthenticating = false;
          }
        })).subscribe({
          error: (error: any) => {
            console.log(error)
          }
        });

        this.actions$.pipe(
          ofType(getUserProfileInfoFailure),
          tap(() => this.router.navigate(['/']))
        ).subscribe();


  }
}
