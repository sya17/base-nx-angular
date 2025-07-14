import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChipItem {
  id: string | number;
  label: string;
  removable?: boolean;
  disabled?: boolean;
}

export type ChipVariant = 'primary' | 'secondary' | 'accent' | 'outline';
export type ChipSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-chips',
  imports: [CommonModule],
  templateUrl: './chips.html',
  styleUrl: './chips.scss',
})
export class Chips {
  @Input() items: ChipItem[] = [];
  @Input() variant: ChipVariant = 'primary';
  @Input() size: ChipSize = 'md';
  @Input() removable = true;
  @Input() disabled = false;

  @Output() chipRemoved = new EventEmitter<ChipItem>();
  @Output() chipClicked = new EventEmitter<ChipItem>();

  get chipClasses(): string {
    return `chips chips--${this.variant} chips--${this.size}`;
  }

  getChipItemClasses(item: ChipItem): string {
    let classes = ['chip'];
    
    if (item.disabled || this.disabled) {
      classes.push('chip--disabled');
    }

    return classes.join(' ');
  }

  onChipClick(item: ChipItem): void {
    if (!item.disabled && !this.disabled) {
      this.chipClicked.emit(item);
    }
  }

  onRemoveChip(item: ChipItem, event: Event): void {
    event.stopPropagation();
    if (!item.disabled && !this.disabled && (item.removable ?? this.removable)) {
      this.chipRemoved.emit(item);
    }
  }
}