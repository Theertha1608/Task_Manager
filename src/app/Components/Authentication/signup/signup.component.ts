import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  selectedProfilePicture: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profilePicture: [null, Validators.required]
    });
  }

  ngOnInit() { }

  isFieldInvalid(field: string) {
    const formField = this.signupForm.get(field);
    return formField?.invalid && (formField?.touched || formField?.dirty);
  }

  onFileSelected(event: any) {
    this.selectedProfilePicture = event.target.files[0];
    this.signupForm.get('profilePicture')?.setValue(this.selectedProfilePicture);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profilePicture: this.selectedProfilePicture?.name || ''
      };

      this.authService.signup(user)
        .subscribe(
          (response: any) => {
            console.log('Signup successful:', response);
            alert('Signup successful! User added to the JSON file.');
            this.router.navigate(['']); 
          },
          (error: any) => {
            console.error('Signup error:', error);
            alert('Error occurred during signup.');
          }
        );
    }
  }
}
