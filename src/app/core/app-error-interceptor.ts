import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getUserProfileInfoFailure } from '../+store/actions/user-actions';
import { Router } from '@angular/router';
import { ApplicationState } from '../+store';
import { Store } from '@ngrx/store';
const API_URL = environment.apiURL;

@Injectable()
export class AppErrorInterceptor implements HttpInterceptor {
 

  constructor(private router: Router, private store: Store<ApplicationState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let reqStream$ = next.handle(request);

    return reqStream$.pipe(
      catchError((err) => {
        let message = err.message;

        if (!navigator.onLine) {
          message = 'No internet connection!';
        }

        if (err.status === 0) {
          message = 'Backend server unavailable!';
        }

        if (err.status === 500) {
          message = 'Server error';
        }

        if (
          message !==
            `Http failure response for ${API_URL}users/login: 401 OK` &&
          message !==
            `Http failure response for ${API_URL}users/register: 400 OK` &&
          message !==
            `Http failure response for ${API_URL}users/profile: 400 OK` &&
          message !==
            `Http failure response for ${API_URL}users/logout: 401 OK`
        ) {
          this.router.navigate(['/error'], {
            queryParams: { error: message, status: err.status },
          });
        }

        if (
          err.status === 401 &&
          message !==
            `Http failure response for ${API_URL}users/login: 401 OK`
        ) {
          this.store.dispatch(
            getUserProfileInfoFailure({ error: new Error(message) })
          );
          this.router.navigate(['/user/login']);
        }

        if (
          message ===
          `Http failure response for ${API_URL}users/register: 400 OK`
        ) {
          message = err.error.message;
        }

        if (
          message ===
          `Http failure response for ${API_URL}users/profile: 400 OK`
        ) {
          message = err.error.message;
        }

        return throwError(() => new Error(message));
      })
    );
  }
}

export const appErrorInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppErrorInterceptor,
  multi: true
}
