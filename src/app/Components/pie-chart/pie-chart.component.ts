import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    const currentUserId = this.userService.getCurrentUserId();
    if (currentUserId) {
      this.generatePieChart(currentUserId);
    }
  }
  generatePieChart(userId: string): void {
    this.taskService.getUserTasks(userId).subscribe((tasks: any[]) => {
      const tasksByPriority: { [priority: string]: any[] } = {
        'High': [],
        'Medium': [],
        'Low': []
      };
  
      tasks.forEach(task => {
        if (task.priority === 'High') {
          tasksByPriority['High'].push(task);
        } else if (task.priority === 'Medium') {
          tasksByPriority['Medium'].push(task);
        } else if (task.priority === 'Low') {
          tasksByPriority['Low'].push(task);
        }
      });
  
      const priorities = ['High', 'Medium', 'Low'];
  
      const pieChartData = {
        labels: priorities,
        datasets: [{
          data: priorities.map(priority => tasksByPriority[priority] ? tasksByPriority[priority].length : 0),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderWidth: 1
        }]
      };
  
      const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false
      };
  
      new Chart('pieChartCanvas', {
        type: 'pie',
        data: pieChartData,
        options: pieChartOptions
      });
    });
  }
}