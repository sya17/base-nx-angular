import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@base-nx-angular/features/auth/ui').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@base-nx-angular/features/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('@base-nx-angular/analytics').then((m) => m.Analytics),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('@base-nx-angular/features/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/active',
    loadComponent: () =>
      import('@base-nx-angular/features/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/completed',
    loadComponent: () =>
      import('@base-nx-angular/features/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/archived',
    loadComponent: () =>
      import('@base-nx-angular/features/projects').then((m) => m.Projects),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('@base-nx-angular/features/team').then((m) => m.Team),
  },
  {
    path: 'team/members',
    loadComponent: () =>
      import('@base-nx-angular/features/team').then((m) => m.Team),
  },
  {
    path: 'team/roles',
    loadComponent: () =>
      import('@base-nx-angular/features/team').then((m) => m.Team),
  },
  {
    path: 'data-management',
    loadComponent: () =>
      import('@base-nx-angular/features/data-management').then((m) => m.DataManagement),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('@base-nx-angular/features/settings').then((m) => m.Settings),
  },
  {
    path: 'settings/general',
    loadComponent: () =>
      import('@base-nx-angular/features/settings').then((m) => m.Settings),
  },
  {
    path: 'settings/security',
    loadComponent: () =>
      import('@base-nx-angular/features/settings').then((m) => m.Settings),
  },
  {
    path: 'settings/notifications',
    loadComponent: () =>
      import('@base-nx-angular/features/settings').then((m) => m.Settings),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];