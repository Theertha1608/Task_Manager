import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // JSON Server API URL

  constructor(private http: HttpClient) {}


  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }
}