import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.generatePieChart();
  }

  generatePieChart(): void {
    this.taskService.getTasksGroupedByPriority().subscribe((tasksByPriority: { [x: string]: string | any[]; }) => {
      const priorities = ['High', 'Medium', 'Low'];

      const pieChartData = {
        labels: priorities,
        datasets: [{
          data: priorities.map(priority => tasksByPriority[priority] ? tasksByPriority[priority].length : 0),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)', // Red for High priority
            'rgba(54, 162, 235, 0.5)', // Blue for Medium priority
            'rgba(255, 206, 86, 0.5)'  // Yellow for Low priority
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
