import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe((tasks: any[]) => {

      this.tasks = tasks;
    });
  }

  deleteTask(task: any): void {

    this.taskService.deleteTask(task.id).subscribe(
      () => {
        console.log('Task deleted successfully:', task);
 
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }
  markAsCompleted(task: any): void {
    this.taskService.markTaskAsCompleted(task.id).subscribe(
      () => {
        console.log('Task marked as completed:', task);
  
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      error => {
        console.error('Error marking task as completed:', error);
      }
    );
  }
}


