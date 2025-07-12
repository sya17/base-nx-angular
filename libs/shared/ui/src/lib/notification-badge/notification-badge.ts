import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge, BadgeColor, BadgeSize } from '../badge/badge';

@Component({
  selector: 'lib-notification-badge',
  imports: [CommonModule, Badge],
  templateUrl: './notification-badge.html',
  styleUrl: './notification-badge.scss',
})
export class NotificationBadge {
  @Input() count = 0;
  @Input() max = 99;
  @Input() showDot = false;
  @Input() color: BadgeColor = 'danger';
  @Input() size: BadgeSize = 'xs';
  @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' =
    'top-right';
  @Input() pulse = false;

  get displayCount(): string {
    if (this.count === 0 || this.showDot) return '';
    return this.count > this.max ? `${this.max}+` : this.count.toString();
  }

  get badgePositionClasses(): string {
    return `notification-badge__badge notification-badge__badge--${this.position}`;
  }
}
