import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../../Services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CreateTaskComponent, TaskDetailsComponent],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  selectedStatus: string = 'all';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      this.tasks = tasks;
      this.filteredTasks = [...this.tasks]; 
    });
  }

  viewTaskDetails(taskId: number): void {
    this.router.navigate(['/task-details', taskId]);
  }

  navigateToCreateTask(): void {
    this.router.navigate(['/create-task']);
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

