import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userEmail: string;

  constructor() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userEmail = storedUser.email;
  }
}