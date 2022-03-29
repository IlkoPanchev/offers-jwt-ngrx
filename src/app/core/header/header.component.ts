import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { ApplicationState } from 'src/app/+store';
import { logoutUser } from 'src/app/+store/actions/user-actions';


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

  constructor(private store: Store<ApplicationState>) {

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
   this.store.dispatch(logoutUser())
  }

  closeMenu(): void {
    this.isHidden = !this.isHidden;
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(true);
    this.destroySubscription$.complete();
  }
}
