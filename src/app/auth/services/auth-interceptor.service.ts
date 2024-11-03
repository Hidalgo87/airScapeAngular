import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedEndpoints = ['/auth/login', '/auth']; // Endpoints with no token

    console.log('INTERCEPTORRRRRRRRR');

    if (excludedEndpoints.some((endpoint) => req.url.includes(endpoint))) {
      return next.handle(req);
    }

    const token = this.userService.getToken();

    if (!!token || this.userService.isTokenExpired()) {
      this.userService.logOut();
      return throwError(
        () => new Error('Request canceled: No authorization token')
      );
    }

    const reqAuthorized = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(reqAuthorized).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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
}
