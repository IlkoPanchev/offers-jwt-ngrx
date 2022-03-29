import { ErrorHandler, Provider } from '@angular/core';
import { Router } from '@angular/router';

class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: Error) {
    console.log(error);

    if (!error.message.includes('401')){
      this.router.navigate(['/error'], {
        queryParams: { error: 'Ooops! Something went wrong!' },
      });
    }
  }
}

export const globalErrorHandlerProvider: Provider = {
  provide: ErrorHandler,
  useFactory: (router: Router) => new GlobalErrorHandler(router),
  deps: [Router],
};
