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
  ) { }

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
