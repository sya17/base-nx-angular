import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Header, UserProfile, NotificationItem } from '../header/header';
import { Sidebar, NavigationItem, SidebarFooterData } from '../sidebar/sidebar';
import { Footer, FooterSection, SocialLink } from '../footer/footer';

@Component({
  selector: 'lib-layout',
  imports: [
    CommonModule,
    Header,
    Sidebar,
    Footer
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit, OnDestroy {
  // Header Configuration
  @Input() user: UserProfile | null = {
    name: 'John Doe',
    role: 'Administrator',
    email: 'john.doe@example.com',
    avatar: ''
  };
  @Input() showHeaderSearch = true;
  @Input() showNotifications = true;
  @Input() notificationCount = 5;
  @Input() notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'New Message',
      message: 'You have received a new message from the team.',
      time: '2 minutes ago',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'System Update',
      message: 'System maintenance will be performed tonight.',
      time: '1 hour ago',
      read: false,
      type: 'warning'
    },
    {
      id: '3',
      title: 'Task Completed',
      message: 'Your task has been completed successfully.',
      time: '3 hours ago',
      read: true,
      type: 'success'
    }
  ];
  @Input() logoText = 'BaseApp';
  @Input() logoIcon = 'dashboard';

  // Sidebar Configuration
  @Input() sidebarCollapsed = false;
  @Input() navigationItems: NavigationItem[] = [];
  @Input() sidebarFooterData: SidebarFooterData | null = null;
  @Input() showSidebarFooter = false;

  // Footer Configuration
  @Input() companyName = 'Base NX Angular';
  @Input() companyDescription = 'A modern Angular application built with NX monorepo architecture.';
  @Input() showFooterSections = true;
  @Input() showSocialLinks = true;
  @Input() customFooterSections: FooterSection[] = [];
  @Input() customSocialLinks: SocialLink[] = [];

  // Layout Configuration
  @Input() showFooter = true;
  @Input() contentPadding = '32px';

  // Internal state
  isMobile = false;
  isMobileMenuOpen = false;
  currentRoute = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.updateSidebarState();
    this.setupRouteTracking();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
    this.updateSidebarState();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 1024;
  }

  private updateSidebarState(): void {
    if (this.isMobile) {
      this.sidebarCollapsed = true;
      this.isMobileMenuOpen = false;
    } else {
      this.isMobileMenuOpen = false;
    }
  }

  private setupRouteTracking(): void {
    // Get initial route
    this.currentRoute = this.router.url;
    
    // Track route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  // Event Handlers
  onMenuToggle(): void {
    if (this.isMobile) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      this.sidebarCollapsed = !this.isMobileMenuOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  onSearchQuery(query: string): void {
    console.log('Search query:', query);
    // Implement search functionality
  }

  onNotificationClick(): void {
    console.log('Notifications clicked');
    // Implement notification functionality
  }

  onNotificationRead(notificationId: string): void {
    console.log('Notification read:', notificationId);
    // Mark notification as read
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  onNotificationClear(): void {
    console.log('Clear all notifications');
    // Clear all notifications
    this.notifications = [];
  }

  onProfileClick(): void {
    console.log('Profile clicked');
    // Implement profile menu functionality
  }

  onLogoClick(): void {
    console.log('Logo clicked');
    this.router.navigate(['/dashboard']);
  }

  onNavigationClick(item: NavigationItem): void {
    console.log('Navigation clicked:', item);
    
    // Navigate to the route
    if (item.route) {
      this.router.navigate([item.route]);
    }
    
    // Close mobile menu after navigation
    if (this.isMobile) {
      this.isMobileMenuOpen = false;
      this.sidebarCollapsed = true;
    }
  }

  onSidebarCollapseToggle(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
    
    if (this.isMobile) {
      this.isMobileMenuOpen = !collapsed;
    }
  }

  get contentMarginLeft(): string {
    if (this.isMobile) {
      return '0';
    }
    return this.sidebarCollapsed ? '80px' : '280px';
  }
}