import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';

@Component({
  selector: 'lib-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() variant: CardVariant = 'default';
  @Input() padding = true;
  @Input() hover = false;
  @Input() clickable = false;

  @HostBinding('class') get hostClasses() {
    return this.clickable ? 'card-host--clickable' : '';
  }

  get hasHeader(): boolean {
    return true; // Will be determined by content projection
  }

  get hasImage(): boolean {
    return true; // Will be determined by content projection
  }

  get hasFooter(): boolean {
    return true; // Will be determined by content projection
  }

  get cardClasses(): string {
    let classes = ['card', `card--${this.variant}`];

    if (this.hover) {
      classes.push('card--hover');
    }

    if (this.clickable) {
      classes.push('card--clickable');
    }

    if (this.padding) {
      classes.push('card--padding');
    }

    return classes.join(' ');
  }

  get headerClasses(): string {
    return 'card__header';
  }

  get contentClasses(): string {
    return 'card__content';
  }

  get footerClasses(): string {
    return 'card__footer';
  }

  get imageClasses(): string {
    return 'card__image';
  }
}
