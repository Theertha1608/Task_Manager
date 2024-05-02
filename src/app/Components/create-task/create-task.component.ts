import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';



@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, SideNavbarComponent, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private userService: UserService // Inject UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue; // Get the current user from the UserService
    if (!this.currentUser) {
      this.router.navigate(['/dashboard']); // Redirect to the dashboard page if the user is not authenticated
    }
    this.initForm();
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      
      // Create a new task object with the current user's ID included
      const task = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        status: formData.status,
        userId: this.currentUser.id // Include the current user's ID
      };
  
      this.taskService.createTask(task).subscribe(
        response => {
          console.log('Task created successfully!', response);
          this.taskForm.reset();
          alert('Task created successfully!');
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  isFieldInvalid(field: string) {
    const control = this.taskForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}