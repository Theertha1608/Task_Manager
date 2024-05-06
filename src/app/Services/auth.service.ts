import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private apiUrl = 'http://localhost:3000/users'; // JSON Server API URL for users

  constructor(private http: HttpClient) {}

  signup(user: { username: string; email: string; password: string; profilePicture: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<any | null> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length === 1) {
          const user = users[0];
          this.isLoggedInSubject.next(true); // Update isLoggedInSubject to true on successful login
          return user;
        } else {
          this.isLoggedInSubject.next(false); // Update isLoggedInSubject to false on failed login
          return null;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  logout(): void {
    this.isLoggedInSubject.next(false); // Update isLoggedInSubject to false on logout
  }
}