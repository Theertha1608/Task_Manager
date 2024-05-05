import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, LoginComponent], // Import modules
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup; // Declare the signupForm FormGroup
  selectedProfilePicture: File | null = null; // Initialize selectedProfilePicture to null

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating form groups
    private authService: AuthService, // Inject AuthService for signing up users
    private router: Router // Inject Router for navigation
  ) {
    // Initialize the signupForm with form controls and validators
    this.signupForm = this.fb.group({
      username: ['', Validators.required], // Username field with required validator
      email: ['', [Validators.required, Validators.email]], // Email field with required and email validators
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)]], // Password field with required and custom pattern validators
      profilePicture: [null, Validators.required] // Profile picture field with required validator
    });
  }    

  ngOnInit() { } // Implement OnInit interface, but no initialization logic needed

  // Method to check if a form field is invalid
  isFieldInvalid(field: string) {
    const formField = this.signupForm.get(field);
    return formField?.invalid && (formField?.touched || formField?.dirty);
  }

  // Method to handle file selection for profile picture
  onFileSelected(event: any) {
    this.selectedProfilePicture = event.target.files[0];
    this.signupForm.get('profilePicture')?.setValue(this.selectedProfilePicture);
  }

  // Method to handle form submission
  onSubmit() {
    if (this.signupForm.valid) { // Check if the form is valid
      const formData = this.signupForm.value; // Get form data
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profilePicture: this.selectedProfilePicture?.name || ''
      };

      // Call the signup method of AuthService to sign up the user
      this.authService.signup(user)
        .subscribe(
          (response: any) => { // Handle successful signup
            console.log('Signup successful:', response);
            alert('Signup successful! User added to the JSON file.');
            this.router.navigate(['']); // Navigate to home page after successful signup
          },
          (error: any) => { // Handle signup error
            console.error('Signup error:', error);
            alert('Error occurred during signup.'); // Show error message
          }
        );
    }
  }
}
