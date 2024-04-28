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


  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<any>(url);
  }

  markTaskAsCompleted(taskId: number): Observable<any> {
    const url = `${this.apiUrl}/${taskId}`;
    // Assuming you have a field called 'completed' in your task object
    const completedTask = { completed: true };
    return this.http.patch<any>(url, completedTask);
  }



}