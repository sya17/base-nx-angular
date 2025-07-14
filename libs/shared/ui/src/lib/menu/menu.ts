import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
}

@Component({
  selector: 'lib-menu',
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  @Input() items: MenuItem[] = [];
  @Input() isOpen = false;
  @Input() position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';
  
  @Output() itemClicked = new EventEmitter<MenuItem>();
  @Output() menuClosed = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.closeMenu();
    }
  }

  get menuClasses(): string {
    let classes = ['menu', `menu--${this.position}`];
    if (this.isOpen) {
      classes.push('menu--open');
    }
    return classes.join(' ');
  }

  onItemClick(item: MenuItem): void {
    if (item.disabled) return;
    
    this.itemClicked.emit(item);
    if (item.action) {
      item.action();
    }
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuClosed.emit();
  }

  onKeyDown(event: KeyboardEvent, item: MenuItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onItemClick(item);
    }
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.id;
  }
}