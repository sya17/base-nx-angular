import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, Card, Progress, Button } from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-analytics',
  imports: [CommonModule, Icon, Card, Progress, Button],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {
  protected chartData = [
    { period: 'Jan', value: 4500, growth: 12 },
    { period: 'Feb', value: 5200, growth: 15.5 },
    { period: 'Mar', value: 4800, growth: -7.7 },
    { period: 'Apr', value: 6100, growth: 27.1 },
    { period: 'May', value: 5900, growth: -3.3 },
    { period: 'Jun', value: 7200, growth: 22.0 }
  ];

  protected metrics = [
    { label: 'Page Views', value: '245,680', change: '+12.5%', isPositive: true },
    { label: 'Unique Visitors', value: '89,432', change: '+8.2%', isPositive: true },
    { label: 'Bounce Rate', value: '32.4%', change: '-2.1%', isPositive: true },
    { label: 'Conversion Rate', value: '4.8%', change: '+0.9%', isPositive: true }
  ];

  protected topPages = [
    { page: '/dashboard', views: 45680, percentage: 35 },
    { page: '/analytics', views: 32450, percentage: 25 },
    { page: '/projects', views: 28930, percentage: 22 },
    { page: '/team', views: 15670, percentage: 12 },
    { page: '/settings', views: 8270, percentage: 6 }
  ];
}