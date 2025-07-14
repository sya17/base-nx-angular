import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon, Card, Chips, Button, Badge } from '@base-nx-angular/shared/ui';

@Component({
  selector: 'lib-team',
  imports: [CommonModule, Icon, Card, Chips, Button, Badge],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  protected teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Senior Frontend Developer',
      email: 'john.doe@company.com',
      avatar: 'JD',
      status: 'online',
      projects: 3,
      skills: ['React', 'TypeScript', 'Angular'],
      joinDate: '2022-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      email: 'jane.smith@company.com',
      avatar: 'JS',
      status: 'away',
      projects: 2,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      joinDate: '2022-03-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Backend Developer',
      email: 'mike.johnson@company.com',
      avatar: 'MJ',
      status: 'online',
      projects: 4,
      skills: ['Node.js', 'Python', 'MongoDB'],
      joinDate: '2021-11-10'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      role: 'Project Manager',
      email: 'sarah.wilson@company.com',
      avatar: 'SW',
      status: 'offline',
      projects: 5,
      skills: ['Agile', 'Scrum', 'Leadership'],
      joinDate: '2021-08-05'
    },
    {
      id: 5,
      name: 'David Brown',
      role: 'DevOps Engineer',
      email: 'david.brown@company.com',
      avatar: 'DB',
      status: 'online',
      projects: 2,
      skills: ['Docker', 'Kubernetes', 'AWS'],
      joinDate: '2022-05-12'
    },
    {
      id: 6,
      name: 'Emily Davis',
      role: 'Data Analyst',
      email: 'emily.davis@company.com',
      avatar: 'ED',
      status: 'away',
      projects: 1,
      skills: ['Python', 'SQL', 'Tableau'],
      joinDate: '2022-07-18'
    }
  ];

  protected getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'online': return 'online';
      case 'away': return 'away';
      case 'offline': return 'offline';
      default: return '';
    }
  }

  protected getOnlineCount(): number {
    return this.teamMembers.filter(member => member.status === 'online').length;
  }

  protected getTotalProjects(): number {
    return this.teamMembers.reduce((sum, member) => sum + member.projects, 0);
  }

  protected getSkillsAsChips(skills: string[]) {
    return skills.map((skill, index) => ({
      id: index,
      label: skill,
      removable: false
    }));
  }
}