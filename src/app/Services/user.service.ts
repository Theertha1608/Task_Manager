import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, from, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;
  private apiUrl = 'http://localhost:3000'; // JSON Server API URL

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUserPassword(newPassword: string): void {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      currentUser.password = newPassword;
      this.setCurrentUser(currentUser);
    }
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }

  updateUser(userId: string, updatedUser: any): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<any>(url, updatedUser);
  }

  getCurrentUserId(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.id : null;
  }
  getImageAsDataUrl(imageUrl: string): Observable<string> {
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      concatMap(blob => this.blobToDataUrlConverter(blob))
    );
  }
  
  private blobToDataUrlConverter(blob: Blob): Observable<string> {
    return from(this.readBlobAsDataUrl(blob));
  }
  
  private readBlobAsDataUrl(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
