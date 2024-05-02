import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000'; // Assuming your JSON server is running locally

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    // Assume you have an endpoint to fetch user profile data
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  updateUserProfile(profileData: any): Observable<any> {
    // Assume you have an endpoint to update user profile data
    return this.http.put<any>(`${this.apiUrl}/profile`, profileData);
  }
}
