import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavbarComponent],
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