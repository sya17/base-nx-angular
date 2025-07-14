import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, Card, Button } from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, Icon, Card, Button],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected stats = [
    { label: 'Total Projects', value: '24', icon: 'folder', trend: '+12%' },
    { label: 'Active Users', value: '1,847', icon: 'group', trend: '+8%' },
    { label: 'Revenue', value: '$12,450', icon: 'attach_money', trend: '+15%' },
    { label: 'Tasks Completed', value: '156', icon: 'check_circle', trend: '+23%' }
  ];

  protected recentActivities = [
    { action: 'New project created', user: 'John Doe', time: '2 hours ago' },
    { action: 'Task completed', user: 'Jane Smith', time: '4 hours ago' },
    { action: 'User registered', user: 'Mike Johnson', time: '6 hours ago' },
    { action: 'Report generated', user: 'Sarah Wilson', time: '8 hours ago' }
  ];
}