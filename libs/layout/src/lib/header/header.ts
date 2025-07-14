import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'lib-header',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() user: UserProfile | null = null;
  @Input() showSearch = true;
  @Input() showNotifications = true;
  @Input() notificationCount = 0;
  @Input() searchPlaceholder = 'Search...';
  @Input() logoText = 'App';
  @Input() logoIcon = 'dashboard';
  
  @Output() menuToggle = new EventEmitter<void>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
  @Output() logoClick = new EventEmitter<void>();

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.emit(target.value);
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  onProfileClick(): void {
    this.profileClick.emit();
  }

  onLogoClick(): void {
    this.logoClick.emit();
  }

  getDefaultAvatar(): string {
    return this.user?.name ? 
      `https://ui-avatars.com/api/?name=${encodeURIComponent(this.user.name)}&background=4f46e5&color=fff&size=40` :
      'https://ui-avatars.com/api/?name=User&background=4f46e5&color=fff&size=40';
  }
}