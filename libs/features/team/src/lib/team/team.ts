import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, Card, Button, Badge, type BadgeColor } from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-team',
  imports: [CommonModule, Icon, Card, Button, Badge],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  protected teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      joinDate: '2022-03-15',
      projects: ['E-commerce Platform', 'Mobile Banking App'],
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      avatar: 'JD',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Product Manager',
      department: 'Product',
      status: 'active',
      joinDate: '2021-11-20',
      projects: ['E-commerce Platform', 'Data Analytics Dashboard'],
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
      avatar: 'JS',
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'UI/UX Designer',
      department: 'Design',
      status: 'active',
      joinDate: '2023-01-10',
      projects: ['Mobile Banking App', 'IoT Device Management'],
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Testing'],
      avatar: 'MJ',
      lastActive: '30 minutes ago'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'DevOps Engineer',
      department: 'Engineering',
      status: 'active',
      joinDate: '2022-08-05',
      projects: ['Mobile Banking App', 'AI Chatbot Platform'],
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      avatar: 'SW',
      lastActive: '4 hours ago'
    },
    {
      id: 5,
      name: 'Tom Brown',
      email: 'tom.brown@company.com',
      role: 'QA Engineer',
      department: 'Quality Assurance',
      status: 'inactive',
      joinDate: '2021-05-12',
      projects: ['Data Analytics Dashboard'],
      skills: ['Selenium', 'Jest', 'Cypress', 'Manual Testing'],
      avatar: 'TB',
      lastActive: '2 days ago'
    },
    {
      id: 6,
      name: 'Alex Chen',
      email: 'alex.chen@company.com',
      role: 'Data Scientist',
      department: 'Analytics',
      status: 'active',
      joinDate: '2023-02-28',
      projects: ['Data Analytics Dashboard', 'AI Chatbot Platform'],
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      avatar: 'AC',
      lastActive: '1 hour ago'
    }
  ];

  protected teamStats = [
    { label: 'Total Members', value: '24', change: '+3', isPositive: true },
    { label: 'Active Members', value: '22', change: '+2', isPositive: true },
    { label: 'Departments', value: '6', change: '0', isPositive: true },
    { label: 'Avg. Experience', value: '3.2y', change: '+0.3y', isPositive: true }
  ];

  protected departments = [
    { name: 'Engineering', count: 12, color: '#667eea' },
    { name: 'Product', count: 4, color: '#10b981' },
    { name: 'Design', count: 3, color: '#f59e0b' },
    { name: 'Quality Assurance', count: 3, color: '#ef4444' },
    { name: 'Analytics', count: 2, color: '#8b5cf6' }
  ];

  protected filterDepartment = 'all';
  protected filterStatus = 'all';
  protected searchTerm = '';

  get filteredMembers() {
    let filtered = this.teamMembers;
    
    if (this.filterDepartment !== 'all') {
      filtered = filtered.filter(member => member.department === this.filterDepartment);
    }
    
    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(member => member.status === this.filterStatus);
    }
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term) ||
        member.role.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }

  protected setDepartmentFilter(department: string) {
    this.filterDepartment = department;
  }

  protected setStatusFilter(status: string) {
    this.filterStatus = status;
  }

  protected onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }

  protected getStatusColor(status: string): BadgeColor {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      default: return 'secondary';
    }
  }

  protected getDepartmentColor(department: string): string {
    const dept = this.departments.find(d => d.name === department);
    return dept?.color || '#6b7280';
  }

  protected formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  protected getExperienceYears(joinDate: string): number {
    const join = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - join.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 365 * 10) / 10;
  }
}