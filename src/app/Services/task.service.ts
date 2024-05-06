import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/tasks'; // JSON Server API URL

  constructor(private http: HttpClient) {}

  // Method to fetch all tasks
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to fetch a task by its ID
  getTaskById(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }

  // Method to fetch tasks by user ID
  getTasksByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Method to create a new task
  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);
  }

  // Method to delete a task by its ID
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  // Method to mark a task as completed
  markTaskAsCompleted(taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}`, { completed: true });
  }

  // Method to update a task
  updateTask(taskId: number, updatedTask: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, updatedTask);
  }

  // Method to fetch tasks by user ID
  getUserTasks(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Method to fetch tasks grouped by priority
  getTasksGroupedByPriority(): Observable<{ [priority: string]: any[] }> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((tasks: any[]) => {
        const tasksByPriority: { [priority: string]: any[] } = {
          'High': [],
          'Medium': [],
          'Low': []
        };

        // Group tasks by priority
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
