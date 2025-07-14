import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, Card, Button, Badge, Progress, type BadgeColor } from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-projects',
  imports: [CommonModule, Icon, Card, Button, Badge, Progress],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'Modern e-commerce solution with advanced features',
      status: 'active',
      progress: 75,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      deadline: '2024-08-15',
      priority: 'high',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication',
      status: 'active',
      progress: 60,
      team: ['Sarah Wilson', 'Tom Brown'],
      deadline: '2024-09-30',
      priority: 'high',
      tags: ['React Native', 'Firebase', 'Security']
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard for business intelligence',
      status: 'completed',
      progress: 100,
      team: ['Alex Chen', 'Maria Garcia', 'David Kim'],
      deadline: '2024-06-20',
      priority: 'medium',
      tags: ['Angular', 'D3.js', 'Python']
    },
    {
      id: 4,
      name: 'IoT Device Management',
      description: 'System for managing and monitoring IoT devices',
      status: 'active',
      progress: 30,
      team: ['Lisa Park', 'James Lee'],
      deadline: '2024-10-15',
      priority: 'medium',
      tags: ['Vue.js', 'MQTT', 'AWS']
    },
    {
      id: 5,
      name: 'AI Chatbot Platform',
      description: 'Intelligent chatbot platform with natural language processing',
      status: 'archived',
      progress: 85,
      team: ['Robert Taylor', 'Emily Davis'],
      deadline: '2024-05-10',
      priority: 'low',
      tags: ['Python', 'TensorFlow', 'NLP']
    }
  ];

  protected projectStats = [
    { label: 'Total Projects', value: '24', change: '+3', isPositive: true },
    { label: 'Active Projects', value: '12', change: '+2', isPositive: true },
    { label: 'Completed', value: '8', change: '+1', isPositive: true },
    { label: 'Team Members', value: '15', change: '0', isPositive: true }
  ];

  protected filterStatus = 'all';
  protected sortBy = 'deadline';

  get filteredProjects() {
    let filtered = this.projects;
    
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(project => project.status === this.filterStatus);
    }
    
    return filtered.sort((a, b) => {
      if (this.sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (this.sortBy === 'progress') {
        return b.progress - a.progress;
      } else if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }

  protected setFilter(status: string) {
    this.filterStatus = status;
  }

  protected setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  protected getStatusColor(status: string): BadgeColor {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'archived': return 'secondary';
      default: return 'secondary';
    }
  }

  protected getPriorityColor(priority: string): BadgeColor {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  }

  protected formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  protected getDaysUntilDeadline(deadline: string): number {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  protected getMemberInitials(memberName: string): string {
    return memberName.split(' ').map(n => n[0]).join('');
  }
}