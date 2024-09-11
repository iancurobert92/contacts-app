import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map, Observable, tap } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USERS_DATA_URL: string = 'credentials.json';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<User | undefined> {
    return this.http.get<User[]>(this.USERS_DATA_URL).pipe(
      delay(2000),
      map((users) => users.find((user) => user.username === username && user.password === password)),
      tap((user) => {
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/']);
        }
      })
    );
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('user');
  }
}
