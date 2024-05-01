import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { NavbarComponent } from '../../navbar/navbar.component';
import { SideNavbarComponent } from '../../side-navbar/side-navbar.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink, RouterOutlet, DashboardComponent, SideNavbarComponent, SignupComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router 
    
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  isFieldInvalid(field: string) {
    const formField = this.loginForm.get(field);
    return formField?.invalid && (formField?.touched || formField?.dirty);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .subscribe(
          (user: any) => {
            if (user) {
              console.log('Login successful:', user);
              alert('Login successful!'); 
              this.router.navigate(['/dashboard']); 
            } else {
              console.error('Invalid email or password');
              alert('Invalid email or password');
            }
          },
          (error: any) => {
            console.error('Login error:', error);
            alert('An error occurred during login'); 
          }
        );
    }
  }
}