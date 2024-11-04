import { Injectable, Signal, signal } from '@angular/core';
import { UserAuth } from '../interfaces/userAuth.interfaces';
import { User } from '../../features/profile/interfaces/user.interface';
import {
  LoginResponse,
  SignUpResponse,
} from '../interfaces/loginResponse.interfaces';
import { v4 as uuid } from 'uuid';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'jwt_token';
  private userKey = 'user_logged';

  // #isLogged = signal(this.isAuthenticated());

  private isLoggedSubject = new Subject<boolean>();
  isLogged$ = this.isLoggedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  login(userAuth: UserAuth): Observable<any> {
    const body = {
      username: userAuth.userName,
      password: userAuth.password,
    };

    return this.http
      .post<{ user: User; token: string }>(`${this.apiUrl}/auth/login`, body)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
          // this.#isLogged.update(() => true);
          this.isLoggedSubject.next(true);
        })
      );
  }

  register(user: UserAuth): Observable<any> {
    const body = {
      email: user.email,
      username: user.userName,
      password: user.password,
      is_owner: user.isOwner,
    };
    return this.http.post<User>(`${this.apiUrl}/auth`, body);
  }

  logOut() {
    localStorage.clear();
    // this.#isLogged.update(() => false);
    this.isLoggedSubject.next(false);
  }

  getUser(): User | undefined {
    const userSrt = localStorage.getItem(this.userKey);
    if (userSrt) {
      const user = JSON.parse(userSrt);
      return {
        userId: user.user_id,
        email: user.email,
        userName: user.username,
        profilePicture: user.profile_picture,
        bio: user.bio,
        isOwner: user.is_owner,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      };
      // this.userSignal.set(user);
    }
    return;
    // return this.userSignal;
  }

  isAuthenticated(): boolean {
    if (!!this.getUser() && !this.isTokenExpired()) {
      return true;
    } else {
      if (this.isLogged$) {
        this.logOut();
      }
      return false;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const { exp } = jwtDecode<{ exp: number }>(token);
    const expiryDate = new Date(exp * 1000);
    return expiryDate < new Date();
  }
}
