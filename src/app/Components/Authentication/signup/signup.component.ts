import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  confirmPassword = '';

  onSubmit() {
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('User registered successfully!');
  }

  isPasswordMatch(): boolean {
    return this.user.password === this.confirmPassword;
  }
}
