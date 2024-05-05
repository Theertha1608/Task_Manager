import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { TaskTableComponent } from '../task-table/task-table.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [SideNavbarComponent, TaskTableComponent, PieChartComponent], // Importing necessary components
  templateUrl: './dashboard.component.html', 
  styleUrl: './dashboard.component.scss' 
})
export class DashboardComponent {
  userEmail: string;

  constructor() {
    // Retrieving user email from local storage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userEmail = storedUser.email;
  }
}
