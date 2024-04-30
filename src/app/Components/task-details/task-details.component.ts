import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';


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

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskId = id !== null && id !== undefined ? id : null;

    if (this.taskId !== null) {
      this.fetchTaskDetails();
    } else {
      console.error('Task ID is null.');
    }
  }

  fetchTaskDetails(): void {
    if (this.taskId !== null) {
      this.taskService.getTaskById(this.taskId).subscribe(
        task => {
          this.task = task;
        },
        error => {
          console.error('Error fetching task details:', error);
        }
      );
    } else {
      console.error('Task ID is null.');
    }
  }

  editTask(): void {
    this.showEditForm = true;
  }

  changeTaskStatus() {
    const newStatus = this.taskCompleted ? 'Completed' : 'Pending';
    this.task.status = newStatus;
    this.saveTask(); // Save the task and navigate to dashboard
  }
  
  saveTask(): void {
    if (this.taskId !== null && this.task) {
      this.taskService.updateTask(this.taskId, this.task).subscribe(
        response => {
          console.log('Task updated successfully!', response);
          this.showEditForm = false;
          window.alert('Task updated successfully!');
          this.router.navigate(['/dashboard']); // Navigate to the dashboard
        },
        error => {
          console.error('Error updating task:', error);
          window.alert('Failed to update task. Please try again.');
        }
      );
    } else {
      console.error('Task ID or task object is null.');
      window.alert('Failed to update task. Task ID or task object is null.');
    }
  }
  

  deleteTask(): void {
    if (this.taskId !== null) {
      this.taskService.deleteTask(this.taskId).subscribe(
        () => {
          console.log('Task deleted successfully');
          window.alert('Task deleted successfully!');
          this.router.navigate(['/dashboard']); // Navigate to the dashboard
        },
        error => {
          console.error('Error deleting task:', error);
        }
      );
    } else {
      console.error('Task ID is null.');
    }
  }
}