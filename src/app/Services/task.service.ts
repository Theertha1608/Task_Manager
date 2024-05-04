import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
  getTasksGroupedByPriority(): Observable<{ [priority: string]: any[] }> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((tasks: any[]) => {
        const tasksByPriority: { [priority: string]: any[] } = {
          'High': [],
          'Medium': [],
          'Low': []
        };

        tasks.forEach(task => {
          if (task.priority === 'High') {
            tasksByPriority['High'].push(task);
          } else if (task.priority === 'Medium') {
            tasksByPriority['Medium'].push(task);
          } else if (task.priority === 'Low') {
            tasksByPriority['Low'].push(task);
          }
        });

        return tasksByPriority;
      })
    );
  }
}

