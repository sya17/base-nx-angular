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
    loadComponent: () => import('@base-nx-angular/projects').then(m => m.Projects)
  },
  {
    path: 'team',
    loadComponent: () => import('@base-nx-angular/team').then(m => m.Team)
  },
  {
    path: 'settings',
    loadComponent: () => import('@base-nx-angular/settings').then(m => m.Settings)
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