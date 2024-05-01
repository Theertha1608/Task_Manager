import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // JSON Server API URL for users

constructor(private http: HttpClient) { }

signup(user: { username: string, email: string, password: string, profilePicture: string }): Observable<any> {
  return this.http.post<any>(this.apiUrl, user);
}
login(email: string, password: string): Observable<any | null> {
  return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
    .pipe(
      map(users => {
        if (users.length === 1) {
          return users[0];
        } else {
          return null;
        }
      })
    );
}
}
