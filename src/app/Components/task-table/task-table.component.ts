import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../../Services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, FormsModule, CreateTaskComponent],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  selectedStatus: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      this.tasks = tasks;
      this.filteredTasks = [...this.tasks]; 
    });
  }


  filterTasks(): void {
    if (this.selectedStatus === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => {
        if (this.selectedStatus === 'overdue') {
          const currentDate = new Date();
          const dueDate = new Date(task.dueDate);
          return dueDate < currentDate;
        } else {
          const taskStatus = task.status.toLowerCase();
          const selectedStatus = this.selectedStatus.toLowerCase();
          return taskStatus === selectedStatus;
        }
      });
    }
  }
  
  
  deleteTask(task: any): void {
    this.taskService.deleteTask(task.id).subscribe(
      () => {
        console.log('Task deleted successfully:', task);
   
        alert('Task deleted successfully');
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.filterTasks(); 
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }
  

 markAsCompleted(task: any): void {
  if (task.status === 'Completed') {
    alert('The task is already completed.');
  } else {
    this.taskService.markTaskAsCompleted(task.id).subscribe(
      () => {
        alert('Task marked as completed successfully!');
        const updatedTask = { ...task, status: 'Completed' };
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.filterTasks(); 
        }
      },
      error => {
        console.error('Error marking task as completed:', error);
      }
    );
  }
}
}

