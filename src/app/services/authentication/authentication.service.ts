import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from 'src/app/models/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  authenticate(username, password) {
    return this.http.post<any>(
      `${this.baseUrl}/authenticate`, {
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }

  register(user: User) {

    return this.http.post<any>(
      `${this.baseUrl}/users/register`, {
        username: user.username,
        password: user.password,
        email: user.email
      });
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }

}
