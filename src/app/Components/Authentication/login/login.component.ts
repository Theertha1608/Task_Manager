import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { DashboardComponent } from '../../dashboard/dashboard.component';
// import { NavbarComponent } from '../../navbar/navbar.component';
import { SideNavbarComponent } from '../../side-navbar/side-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, SideNavbarComponent],
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
      this.router.navigate(['/side-navbar'])
        .then(() => {
          alert('Login successful!');
        });
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}