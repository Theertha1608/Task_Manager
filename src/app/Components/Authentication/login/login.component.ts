import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule, DashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (this.email === storedUser.email && this.password === storedUser.password) {
      this.router.navigate(['/dashboard'])
        .then(() => {
          alert('Login successful!');
        });
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}