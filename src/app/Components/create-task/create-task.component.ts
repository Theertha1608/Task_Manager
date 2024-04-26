import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, SideNavbarComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

    task: any = {}; 
  
    constructor(private taskService: TaskService) {} 
  
    onSubmit() {

      this.taskService.createTask(this.task).subscribe(response => {
        console.log('Task created successfully!', response);

        this.task = {};
      }, error => {
        console.error('Error creating task:', error);
      });
    }
  }
