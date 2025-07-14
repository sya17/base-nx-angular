import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar, NavigationItem } from '@base-nx-angular/layout';

@Component({
  selector: 'app-sidebar-test',
  standalone: true,
  imports: [CommonModule, Sidebar],
  template: `
    <div style="display: flex; height: 100vh;">
      <lib-sidebar 
        [navigationItems]="testNavigationItems"
        [currentRoute]="currentRoute"
        [showFooter]="true"
        (navigationClick)="onNavigationClick($event)"
      ></lib-sidebar>
      
      <div style="flex: 1; padding: 20px; margin-left: 280px;">
        <h1>Sidebar Test</h1>
        <p>Current Route: {{ currentRoute }}</p>
        <p>Last Clicked: {{ lastClicked }}</p>
        
        <div style="margin-top: 20px;">
          <h3>Test Navigation:</h3>
          <button (click)="setRoute('/projects/active/web/ecommerce')" style="margin: 5px; padding: 10px;">
            Navigate to E-commerce (Level 3)
          </button>
          <button (click)="setRoute('/team/members/developers/frontend')" style="margin: 5px; padding: 10px;">
            Navigate to Frontend Devs (Level 4)
          </button>
          <button (click)="setRoute('/settings/general/appearance/themes')" style="margin: 5px; padding: 10px;">
            Navigate to Themes (Level 4)
          </button>
          <button (click)="setRoute('/dashboard')" style="margin: 5px; padding: 10px;">
            Navigate to Dashboard (Level 0)
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
    
    button {
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background: #4338ca;
    }
  `]
})
export class SidebarTestComponent {
  currentRoute = '/dashboard';
  lastClicked = 'None';

  testNavigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      isActive: true,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'analytics',
      route: '/analytics',
      badge: '3',
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'folder',
      route: '/projects',
      children: [
        {
          id: 'active-projects',
          label: 'Active Projects',
          icon: 'play_arrow',
          route: '/projects/active',
          children: [
            {
              id: 'web-projects',
              label: 'Web Applications',
              icon: 'web',
              route: '/projects/active/web',
              children: [
                {
                  id: 'ecommerce-app',
                  label: 'E-commerce Platform',
                  icon: 'shopping_cart',
                  route: '/projects/active/web/ecommerce',
                  badge: 'New',
                },
                {
                  id: 'blog-platform',
                  label: 'Blog Platform',
                  icon: 'article',
                  route: '/projects/active/web/blog',
                },
              ],
            },
            {
              id: 'mobile-projects',
              label: 'Mobile Applications',
              icon: 'phone_android',
              route: '/projects/active/mobile',
              children: [
                {
                  id: 'ios-app',
                  label: 'iOS App',
                  icon: 'phone_iphone',
                  route: '/projects/active/mobile/ios',
                },
                {
                  id: 'android-app',
                  label: 'Android App',
                  icon: 'android',
                  route: '/projects/active/mobile/android',
                },
              ],
            },
          ],
        },
        {
          id: 'completed-projects',
          label: 'Completed',
          icon: 'check_circle',
          route: '/projects/completed',
          children: [
            {
              id: 'legacy-systems',
              label: 'Legacy Systems',
              icon: 'history',
              route: '/projects/completed/legacy',
            },
            {
              id: 'client-work',
              label: 'Client Work',
              icon: 'business',
              route: '/projects/completed/client',
            },
          ],
        },
        {
          id: 'archived-projects',
          label: 'Archived',
          icon: 'archive',
          route: '/projects/archived',
        },
      ],
      isExpanded: false,
    },
    {
      id: 'team',
      label: 'Team',
      icon: 'group',
      route: '/team',
      children: [
        {
          id: 'team-members',
          label: 'Members',
          icon: 'person',
          route: '/team/members',
          children: [
            {
              id: 'developers',
              label: 'Developers',
              icon: 'code',
              route: '/team/members/developers',
              children: [
                {
                  id: 'frontend-devs',
                  label: 'Frontend',
                  icon: 'web',
                  route: '/team/members/developers/frontend',
                },
                {
                  id: 'backend-devs',
                  label: 'Backend',
                  icon: 'storage',
                  route: '/team/members/developers/backend',
                },
                {
                  id: 'fullstack-devs',
                  label: 'Full Stack',
                  icon: 'layers',
                  route: '/team/members/developers/fullstack',
                },
              ],
            },
            {
              id: 'designers',
              label: 'Designers',
              icon: 'palette',
              route: '/team/members/designers',
            },
            {
              id: 'managers',
              label: 'Project Managers',
              icon: 'supervisor_account',
              route: '/team/members/managers',
            },
          ],
        },
        {
          id: 'team-roles',
          label: 'Roles & Permissions',
          icon: 'security',
          route: '/team/roles',
          children: [
            {
              id: 'admin-roles',
              label: 'Admin Roles',
              icon: 'admin_panel_settings',
              route: '/team/roles/admin',
            },
            {
              id: 'user-roles',
              label: 'User Roles',
              icon: 'person_outline',
              route: '/team/roles/user',
            },
          ],
        },
      ],
      isExpanded: false,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
      children: [
        {
          id: 'general-settings',
          label: 'General',
          icon: 'tune',
          route: '/settings/general',
          children: [
            {
              id: 'appearance',
              label: 'Appearance',
              icon: 'color_lens',
              route: '/settings/general/appearance',
              children: [
                {
                  id: 'themes',
                  label: 'Themes',
                  icon: 'style',
                  route: '/settings/general/appearance/themes',
                },
                {
                  id: 'layout',
                  label: 'Layout',
                  icon: 'view_quilt',
                  route: '/settings/general/appearance/layout',
                },
              ],
            },
            {
              id: 'language',
              label: 'Language',
              icon: 'language',
              route: '/settings/general/language',
            },
          ],
        },
        {
          id: 'security-settings',
          label: 'Security',
          icon: 'shield',
          route: '/settings/security',
          children: [
            {
              id: 'authentication',
              label: 'Authentication',
              icon: 'fingerprint',
              route: '/settings/security/auth',
            },
            {
              id: 'privacy',
              label: 'Privacy',
              icon: 'privacy_tip',
              route: '/settings/security/privacy',
            },
          ],
        },
        {
          id: 'notification-settings',
          label: 'Notifications',
          icon: 'notifications',
          route: '/settings/notifications',
          children: [
            {
              id: 'email-notifications',
              label: 'Email',
              icon: 'email',
              route: '/settings/notifications/email',
            },
            {
              id: 'push-notifications',
              label: 'Push',
              icon: 'push_pin',
              route: '/settings/notifications/push',
            },
          ],
        },
      ],
      isExpanded: false,
    },
  ];

  onNavigationClick(item: NavigationItem): void {
    this.lastClicked = item.label;
    if (item.route) {
      this.currentRoute = item.route;
    }
  }

  setRoute(route: string): void {
    this.currentRoute = route;
  }
}