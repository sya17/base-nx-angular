import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'info' | 'warning' | 'error' | 'success';
}

@Component({
  selector: 'lib-header',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule, MatDividerModule, MatMenuModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() user: UserProfile | null = null;
  @Input() showSearch = true;
  @Input() showNotifications = true;
  @Input() notificationCount = 0;
  @Input() notifications: NotificationItem[] = [];
  @Input() searchPlaceholder = 'Search...';
  @Input() logoText = 'App';
  @Input() logoIcon = 'dashboard';
  
  @Output() menuToggle = new EventEmitter<void>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() logoClick = new EventEmitter<void>();
  @Output() notificationRead = new EventEmitter<string>();
  @Output() notificationClear = new EventEmitter<void>();

  // Drawer states
  showNotificationDrawer = false;
  showProfileDrawer = false;
  searchValue = '';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-drawer') && !target.closest('.notifications')) {
      this.showNotificationDrawer = false;
    }
    if (!target.closest('.profile-drawer') && !target.closest('.user-profile')) {
      this.showProfileDrawer = false;
    }
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue = target.value;
    this.searchQuery.emit(target.value);
  }

  onSearchClear(): void {
    this.searchValue = '';
    this.searchQuery.emit('');
  }

  onNotificationClick(): void {
    this.showNotificationDrawer = !this.showNotificationDrawer;
    this.showProfileDrawer = false;
    this.notificationClick.emit();
  }

  onProfileClick(): void {
    this.showProfileDrawer = !this.showProfileDrawer;
    this.showNotificationDrawer = false;
    this.profileClick.emit();
  }

  onLogoClick(): void {
    this.logoClick.emit();
  }

  onNotificationItemClick(notification: NotificationItem): void {
    if (!notification.read) {
      this.notificationRead.emit(notification.id);
    }
  }

  onClearAllNotifications(): void {
    this.notificationClear.emit();
  }

  get unreadNotificationCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotificationIcon(type?: string): string {
    switch (type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  }

  getNotificationColor(type?: string): string {
    switch (type) {
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'success': return '#10b981';
      default: return '#3b82f6';
    }
  }

  getDefaultAvatar(): string {
    return this.user?.name ? 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(this.user.name)}&background=4f46e5&color=fff&size=40` :
      'https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff&size=40';
  }
}