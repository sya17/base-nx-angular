import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'solid' | 'outline' | 'soft' | 'dot';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'gray';

@Component({
  selector: 'lib-badge',
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  @Input() variant: BadgeVariant = 'solid';
  @Input() size: BadgeSize = 'sm';
  @Input() color: BadgeColor = 'primary';
  @Input() removable = false;
  @Input() pill = false;
  @Input() pulse = false;

  @Output() removed = new EventEmitter<void>();

  get badgeClasses(): string {
    let classes = [
      'badge',
      `badge--${this.variant}`,
      `badge--${this.size}`,
      `badge--${this.color}`,
    ];

    if (this.pill) {
      classes.push('badge--pill');
    }

    if (this.pulse) {
      classes.push('badge--pulse');
    }

    return classes.join(' ');
  }

  get dotClasses(): string {
    let classes = [
      'badge__dot',
      `badge__dot--${this.size}`,
      `badge__dot--${this.color}`,
    ];

    if (this.pulse) {
      classes.push('badge__dot--pulse');
    }

    return classes.join(' ');
  }

  get removeButtonClasses(): string {
    return `badge__remove badge__remove--${this.size}`;
  }

  onRemove(): void {
    this.removed.emit();
  }
}
