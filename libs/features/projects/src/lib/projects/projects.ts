import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-projects',
  imports: [CommonModule, MatIconModule, MatCardModule, MatProgressBarModule, MatChipsModule, MatButtonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Modern e-commerce solution with React and Node.js',
      status: 'In Progress',
      progress: 75,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      deadline: '2024-02-15',
      priority: 'High'
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application for iOS and Android',
      status: 'Planning',
      progress: 25,
      team: ['Sarah Wilson', 'David Brown'],
      deadline: '2024-03-20',
      priority: 'Medium'
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard for business intelligence',
      status: 'Completed',
      progress: 100,
      team: ['Emily Davis', 'Tom Wilson', 'Lisa Anderson'],
      deadline: '2024-01-10',
      priority: 'Low'
    },
    {
      id: 4,
      name: 'CRM System',
      description: 'Customer relationship management system',
      status: 'In Progress',
      progress: 60,
      team: ['Alex Johnson', 'Maria Garcia'],
      deadline: '2024-02-28',
      priority: 'High'
    }
  ];

  protected getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed': return 'completed';
      case 'in progress': return 'in-progress';
      case 'planning': return 'planning';
      default: return '';
    }
  }

  protected getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return '';
    }
  }

  protected getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('');
  }
}