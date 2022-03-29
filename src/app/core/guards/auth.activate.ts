import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil, tap } from "rxjs";
import { ApplicationState } from "src/app/+store";
import { IUser } from "src/app/shared/interfaces";

@Injectable()
export class AuthActivate implements CanActivate, OnDestroy{

  user: IUser | undefined;
  destroySubscription$: Subject<boolean> = new Subject();


    constructor(private router: Router,
       private store: Store<ApplicationState>) { }
 

    canActivate(route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
      const { authenticationRequired, authenticationFailureRedirectUrl } = route.data;

      this.store.select((state) => state.userState).pipe(
        takeUntil(this.destroySubscription$),
        tap((userState) => this.user = userState.user)
      ).subscribe();

      if (
        typeof authenticationRequired === 'boolean' &&
        authenticationRequired === !!this.user
      ) { return true; }
  
      let authRedirectUrl = authenticationFailureRedirectUrl;
      
      if (authenticationRequired) {
        const loginRedirectUrl = route.url.reduce((acc, s) => `${acc}/${s.path}`, '');
        authRedirectUrl += `?redirectUrl=${loginRedirectUrl}`;
      }
  
      return this.router.parseUrl(authRedirectUrl || '/');
    }


    ngOnDestroy(): void {
     this.destroySubscription$.next(true);
     this.destroySubscription$.complete();
    }

}