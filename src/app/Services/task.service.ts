import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks'; // JSON Server API URL

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  // Add the new method to fetch tasks by user ID
  getTasksByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  markTaskAsCompleted(taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}`, { completed: true });
  }

  updateTask(taskId: number, updatedTask: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, updatedTask);
  }
}
