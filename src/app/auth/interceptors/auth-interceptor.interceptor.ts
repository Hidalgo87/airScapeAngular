import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedEndpoints = ['/auth/login', '/auth']; // Endpoints with no token

  const userService = inject(UserService);

  if (excludedEndpoints.some((endpoint) => req.url.includes(endpoint))) {
    return next(req);
  }

  const token = userService.getToken();

  if (!!token || userService.isAuthenticated()) {
    return throwError(
      () => new Error('Request canceled: No authorization token')
    );
  }

  const reqAuthorized = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(reqAuthorized).pipe(catchError(handleError));
};

function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );
  }
  // Return an observable with a user-facing error message.
  // return throwError(() => new Error('Something bad happened; please try again later.'));
  return throwError(() => new Error(error.error));
}
