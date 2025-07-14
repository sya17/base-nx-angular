import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@base-nx-angular/features/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'analytics',
    loadComponent: () => import('@base-nx-angular/analytics').then(m => m.Analytics)
  },
  {
    path: 'projects',
    loadComponent: () => import('@base-nx-angular/features/projects').then(m => m.Projects)
  },
  {
    path: 'projects/active',
    loadComponent: () => import('@base-nx-angular/features/projects').then(m => m.Projects)
  },
  {
    path: 'projects/completed',
    loadComponent: () => import('@base-nx-angular/features/projects').then(m => m.Projects)
  },
  {
    path: 'projects/archived',
    loadComponent: () => import('@base-nx-angular/features/projects').then(m => m.Projects)
  },
  {
    path: 'team',
    loadComponent: () => import('@base-nx-angular/features/team').then(m => m.Team)
  },
  {
    path: 'team/members',
    loadComponent: () => import('@base-nx-angular/features/team').then(m => m.Team)
  },
  {
    path: 'team/roles',
    loadComponent: () => import('@base-nx-angular/features/team').then(m => m.Team)
  },
  {
    path: 'settings',
    loadComponent: () => import('@base-nx-angular/features/settings').then(m => m.Settings)
  },
  {
    path: 'settings/general',
    loadComponent: () => import('@base-nx-angular/features/settings').then(m => m.Settings)
  },
  {
    path: 'settings/security',
    loadComponent: () => import('@base-nx-angular/features/settings').then(m => m.Settings)
  },
  {
    path: 'settings/notifications',
    loadComponent: () => import('@base-nx-angular/features/settings').then(m => m.Settings)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  }
];