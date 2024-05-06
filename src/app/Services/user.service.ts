import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, from, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>; // Subject to store the current user
  public currentUser$: Observable<any>; // Observable to observe changes to the current user
  private apiUrl = 'http://localhost:3000'; // JSON Server API URL

  constructor(private http: HttpClient) {
    // Initialize the currentUserSubject with the value from localStorage if available
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable(); // Expose the currentUserSubject as an observable
  }

  // Getter for accessing the current user value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Method to set the current user and store it in localStorage
  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user); // Emit the new user to observers
  }

  // Method to remove the current user from localStorage and emit null to observers
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Method to update the password of the current user
  updateUserPassword(newPassword: string): void {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      currentUser.password = newPassword;
      this.setCurrentUser(currentUser); // Update the current user
    }
  }

  // Method to fetch a user by ID from the API
  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }

  // Method to update a user's information on the API
  updateUser(userId: string, updatedUser: any): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<any>(url, updatedUser);
  }

  // Method to get the ID of the current user
  getCurrentUserId(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.id : null;
  }

  // Method to fetch an image as a data URL
  getImageAsDataUrl(imageUrl: string): Observable<string> {
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      concatMap(blob => this.blobToDataUrlConverter(blob))
    );
  }
  
  // Convert a Blob to a data URL
  private blobToDataUrlConverter(blob: Blob): Observable<string> {
    return from(this.readBlobAsDataUrl(blob));
  }
  
  // Read a Blob as a data URL
  private readBlobAsDataUrl(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
