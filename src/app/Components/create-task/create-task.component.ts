import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../Services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, SideNavbarComponent, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) {}

  ngOnInit() {
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
      this.taskService.createTask(this.taskForm.value).subscribe(
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