import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError, finalize, of } from 'rxjs';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { environment } from '../../environments/environment';
import { ApplicationState } from '../+store';
import { Store } from '@ngrx/store';
import { getUserProfileInfoFailure } from '../+store/actions/user-actions';
const API_URL = environment.apiURL;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: SpinnerVisibilityService,
    private store: Store<ApplicationState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let reqStream$ = next.handle(req);

    this.spinner.show();

    if (req.url.startsWith('/api')) {
      reqStream$ = next.handle(
        req.clone({
          url: req.url.replace('/api/', API_URL),
          withCredentials: true,
         
        })
      );
    }

  

    return reqStream$.pipe(
      // catchError((err) => {
      //   let message = err.message;

      //   if (!navigator.onLine) {
      //     message = 'No internet connection!';
      //   }

      //   if (err.status === 0) {
      //     message = 'Backend server unavailable!';
      //   }

      //   if (err.status === 500) {
      //     message = 'Server error';
      //   }

      //   if (
      //     message !==
      //       `Http failure response for ${API_URL}users/login: 401 OK` &&
      //     message !==
      //       `Http failure response for ${API_URL}users/register: 400 OK` &&
      //     message !==
      //       `Http failure response for ${API_URL}users/profile: 400 OK` &&
      //     message !==
      //       `Http failure response for ${API_URL}users/logout: 401 OK`
      //   ) {
      //     this.router.navigate(['/error'], {
      //       queryParams: { error: message, status: err.status },
      //     });
      //   }

      //   if (
      //     err.status === 401 &&
      //     message !==
      //       `Http failure response for ${API_URL}users/login: 401 OK`
      //   ) {
      //     this.store.dispatch(
      //       getUserProfileInfoFailure({ error: new Error(message) })
      //     );
      //     this.router.navigate(['/user/login']);
      //   }

      //   if (
      //     message ===
      //     `Http failure response for ${API_URL}users/register: 400 OK`
      //   ) {
      //     message = err.error.message;
      //   }

      //   if (
      //     message ===
      //     `Http failure response for ${API_URL}users/profile: 400 OK`
      //   ) {
      //     message = err.error.message;
      //   }

      //   return throwError(() => new Error(message));
      // }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
