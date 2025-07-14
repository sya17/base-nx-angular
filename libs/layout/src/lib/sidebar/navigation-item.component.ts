import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { NavigationItem } from './sidebar';

@Component({
  selector: 'lib-navigation-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <li 
      class="nav-item" 
      [class.active]="isItemActive(item)"
      [class.has-children]="hasChildren(item)"
      [class.expanded]="item.isExpanded"
      [attr.data-level]="level"
    >
      <a 
        (click)="onItemClick(item)"
        [attr.aria-label]="item.label"
        [attr.aria-expanded]="hasChildren(item) ? item.isExpanded : null"
        role="button"
        tabindex="0"
        class="nav-link"
        [class.nav-sublink]="level > 0"
        [class.nav-level-1]="level === 1"
        [class.nav-level-2]="level === 2"
        [class.nav-level-3]="level === 3"
        [class.nav-level-4]="level >= 4"
        [style.padding-left.px]="getLinkPadding()"
      >
        <mat-icon [style.font-size.px]="getIconSize()" [style.width.px]="getIconSize()" [style.height.px]="getIconSize()">{{ item.icon }}</mat-icon>
        <span *ngIf="!isCollapsed" class="nav-label">{{ item.label }}</span>
        <span 
          class="nav-badge" 
          *ngIf="item.badge && !isCollapsed"
          [attr.aria-label]="item.badge + ' items'"
        >
          {{ item.badge }}
        </span>
        <mat-icon 
          *ngIf="hasChildren(item) && !isCollapsed"
          class="expand-icon"
          aria-hidden="true"
          [style.font-size.px]="14"
          [style.width.px]="14"
          [style.height.px]="14"
        >
          {{ item.isExpanded ? 'expand_less' : 'expand_more' }}
        </mat-icon>
      </a>
      
      <!-- Recursive Children/Submenu -->
      <ul 
        *ngIf="hasChildren(item) && !isCollapsed" 
        class="nav-submenu"
        [class.expanded]="item.isExpanded"
        [attr.data-level]="level"
        [@slideAnimation]="item.isExpanded ? 'expanded' : 'collapsed'"
      >
        <lib-navigation-item
          *ngFor="let child of getVisibleChildren(item)"
          [item]="child"
          [level]="level + 1"
          [isCollapsed]="isCollapsed"
          [currentRoute]="currentRoute"
          [activeItemId]="activeItemId"
          (itemClick)="onChildItemClick($event)"
        ></lib-navigation-item>
      </ul>
    </li>
  `,
  styleUrl: './navigation-item.component.scss',
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
export class NavigationItemComponent {
  @Input() item!: NavigationItem;
  @Input() level = 0;
  @Input() isCollapsed = false;
  @Input() currentRoute = '';
  @Input() activeItemId: string | null = null;

  @Output() itemClick = new EventEmitter<NavigationItem>();

  onItemClick(item: NavigationItem): void {
    this.itemClick.emit(item);
  }

  onChildItemClick(item: NavigationItem): void {
    this.itemClick.emit(item);
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

  isItemActive(item: NavigationItem): boolean {
    // Check if current route matches the item's route
    if (this.currentRoute && item.route) {
      return (
        this.currentRoute === item.route ||
        this.currentRoute.startsWith(item.route + '/')
      );
    }

    // Check if any child is active recursively
    if (item.children) {
      return this.hasActiveChildRecursive(item.children);
    }

    // Fallback to previous logic
    return this.activeItemId ? item.id === this.activeItemId : !!item.isActive;
  }

  private hasActiveChildRecursive(children: NavigationItem[]): boolean {
    return children.some(child => {
      // Check if this child is active
      if (this.currentRoute && child.route) {
        const isChildActive = this.currentRoute === child.route || 
                             this.currentRoute.startsWith(child.route + '/');
        if (isChildActive) return true;
      }
      
      // Check if any grandchild is active
      if (child.children) {
        return this.hasActiveChildRecursive(child.children);
      }
      
      return false;
    });
  }

  getLinkPadding(): number {
    const basePadding = 24;
    const levelIndent = 20;
    return basePadding + (this.level * levelIndent);
  }

  getIconSize(): number {
    switch (this.level) {
      case 0:
        return 20;
      case 1:
        return 18;
      case 2:
        return 16;
      case 3:
        return 14;
      default:
        return 12;
    }
  }

  getFontSize(): number {
    switch (this.level) {
      case 0:
        return 14;
      case 1:
        return 13;
      case 2:
        return 12;
      case 3:
        return 11;
      default:
        return 10;
    }
  }
}