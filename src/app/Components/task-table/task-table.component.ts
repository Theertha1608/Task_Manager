import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../../Services/task.service';
import { FormsModule } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';


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
  currentUser: any; // Define currentUser variable

  constructor(private taskService: TaskService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user; // Assign the current user
        this.fetchTasks(); // Fetch tasks associated with the current user
      } else {
        this.router.navigate(['/login']); // Redirect to the login page if the user is not authenticated
      }
    });
  }

  fetchTasks(): void {
    this.taskService.getTasksByUserId(this.currentUser.id).subscribe(
      (      tasks: any[]) => {
        this.tasks = tasks;
        this.filteredTasks = [...this.tasks];
      },
      (      error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
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

}

