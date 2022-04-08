import { Component, OnDestroy } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { clearAppState, logoutUser, logoutUserSuccess } from 'src/app/+store/actions/user-actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {

  username: string = '';
  isLogged: boolean = false;
  isHidden: boolean = true;
  destroySubscription$: Subject<boolean> = new Subject();

  constructor(private store: Store<ApplicationState>,
              private $actions: ScannedActionsSubject) {

    this.store.select(state => state.userState)
      .pipe(
        tap((userState) => {
          if(userState.user){
            this.username = userState.user.username;
            this.isLogged = true;
          }
          else{
            this.username = '';
            this.isLogged = false;
          }
        }),
        takeUntil(this.destroySubscription$)
      ).subscribe( {
        error: (error: any) => {
          console.log(error)
        }
      });
  }

  
  logout(): void {

   this.store.dispatch(logoutUser());

   this.$actions.pipe(
     ofType(logoutUserSuccess),
     takeUntil(this.destroySubscription$),
     tap(() => {
       setTimeout(() => {
        this.store.dispatch(clearAppState());
       })
     })
   ).subscribe()
  }

  closeMenu(): void {
    this.isHidden = !this.isHidden;
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}


