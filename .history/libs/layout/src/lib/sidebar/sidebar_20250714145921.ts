import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: string | number;
  children?: NavigationItem[];
  isActive?: boolean;
  isExpanded?: boolean;
  level?: number;
}

export interface SidebarFooterData {
  title: string;
  subtitle: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon?: string;
}

@Component({
  selector: 'lib-sidebar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  animations: [
    trigger('slideAnimation', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'visible',
        })
      ),
      transition('collapsed <=> expanded', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'),
      ]),
    ]),
  ],
})
export class Sidebar {
  @Input() isCollapsed = false;
  @Input() navigationItems: NavigationItem[] = [];
  @Input() footerData: SidebarFooterData | null = null;
  @Input() showFooter = false;
  @Input() activeItemId: string | null = null;
  @Input() currentRoute = '';

  @Output() navigationClick = new EventEmitter<NavigationItem>();
  @Output() collapseToggle = new EventEmitter<boolean>();

  defaultNavigationItems: NavigationItem[] = [
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
        },
        {
          id: 'completed-projects',
          label: 'Completed',
          icon: 'check_circle',
          route: '/projects/completed',
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
        },
        {
          id: 'team-roles',
          label: 'Roles & Permissions',
          icon: 'security',
          route: '/team/roles',
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
        },
        {
          id: 'security-settings',
          label: 'Security',
          icon: 'shield',
          route: '/settings/security',
        },
        {
          id: 'notification-settings',
          label: 'Notifications',
          icon: 'notifications',
          route: '/settings/notifications',
        },
      ],
      isExpanded: false,
    },
  ];

  defaultFooterData: SidebarFooterData = {
    title: 'Total Balance',
    subtitle: 'Current Month',
    value: '$12,450.00',
    change: {
      value: '+12.5%',
      isPositive: true,
    },
    icon: 'account_balance_wallet',
  };

  get currentNavigationItems(): NavigationItem[] {
    return this.navigationItems.length > 0
      ? this.navigationItems
      : this.defaultNavigationItems;
  }

  get currentFooterData(): SidebarFooterData | null {
    return this.footerData || (this.showFooter ? this.defaultFooterData : null);
  }

  onNavigationItemClick(item: NavigationItem): void {
    // If item has children, toggle expansion instead of navigation
    if (this.hasChildren(item)) {
      this.toggleItemExpansion(item);
      return;
    }

    // Update active state for leaf items only
    this.setActiveItem(item);

    this.navigationClick.emit(item);
  }

  toggleItemExpansion(item: NavigationItem): void {
    // Close other expanded items first (accordion behavior)
    this.currentNavigationItems.forEach((navItem) => {
      if (navItem.id !== item.id && navItem.isExpanded) {
        navItem.isExpanded = false;
      }
    });

    // Toggle the clicked item
    item.isExpanded = !item.isExpanded;
  }

  setActiveItem(item: NavigationItem): void {
    // Clear all active states
    this.clearActiveStates(this.currentNavigationItems);

    // Set the clicked item as active
    item.isActive = true;

    // If it's a child item, also expand its parent
    this.expandParentIfChild(item);
  }

  clearActiveStates(items: NavigationItem[]): void {
    items.forEach((item) => {
      item.isActive = false;
      if (item.children) {
        this.clearActiveStates(item.children);
      }
    });
  }

  expandParentIfChild(targetItem: NavigationItem): void {
    this.currentNavigationItems.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some(
          (child) => child.id === targetItem.id
        );
        if (isChildActive) {
          item.isExpanded = true;
        }
      }
    });
  }

  hasChildren(item: NavigationItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  getVisibleChildren(item: NavigationItem): NavigationItem[] {
    if (!item.children || !item.isExpanded) {
      return [];
    }
    return item.children;
  }

  onToggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseToggle.emit(this.isCollapsed);
  }

  isItemActive(item: NavigationItem): boolean {
    // Check if current route matches the item's route
    if (this.currentRoute && item.route) {
      return (
        this.currentRoute === item.route ||
        this.currentRoute.startsWith(item.route + '/')
      );
    }

    // Check if any child is active
    if (item.children) {
      return item.children.some((child) => this.isItemActive(child));
    }

    // Fallback to previous logic
    return this.activeItemId ? item.id === this.activeItemId : !!item.isActive;
  }
}
