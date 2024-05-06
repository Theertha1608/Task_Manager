import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SideNavbarComponent, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit {
  taskId: any;
  task: any;
  showEditForm: boolean = false;
  taskCompleted: boolean = false;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the current user
    this.currentUser = this.userService.currentUserValue;
    // Redirect to login page if user is not authenticated
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
    // Fetch task details
    this.fetchTaskDetails();
  }

  // Fetch task details based on task ID
  fetchTaskDetails(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(
        task => {
          this.task = task;
        }
      );
    }
  }

  // Enable editing of task
  editTask(): void {
    this.showEditForm = true;
  }

  // Change task status (toggle between completed/pending)
  changeTaskStatus(): void {
    const newStatus = this.taskCompleted ? 'Completed' : 'Pending';
    this.task.status = newStatus;
    this.saveTask();
  }

  // Save task details
  saveTask(): void {
    if (this.taskId && this.task) {
      this.taskService.updateTask(this.taskId, this.task).subscribe(
        response => {
          // Success message
          window.alert('Task updated successfully!');
          this.showEditForm = false;
          this.router.navigate(['/dashboard']);
        },
        error => {
          // Error message
          window.alert('Failed to update task. Please try again.');
        }
      );
    } else {
      // Error message
      window.alert('Failed to update task. Task ID or task object is null.');
    }
  }

  // Delete task
  deleteTask(): void {
    if (this.taskId) {
      this.taskService.deleteTask(this.taskId).subscribe(
        () => {
          // Success message
          window.alert('Task deleted successfully!');
          this.router.navigate(['/dashboard']);
        }
      );
    }
  }
}
