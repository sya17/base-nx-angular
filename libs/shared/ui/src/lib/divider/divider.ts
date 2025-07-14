import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

@Component({
  selector: 'lib-divider',
  imports: [CommonModule],
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
})
export class Divider {
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() variant: DividerVariant = 'solid';
  @Input() color = '';
  @Input() thickness = 1;
  @Input() spacing = 16;

  get dividerClasses(): string {
    let classes = ['divider', `divider--${this.orientation}`, `divider--${this.variant}`];
    return classes.join(' ');
  }

  get dividerStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    if (this.color) {
      styles['border-color'] = this.color;
    }
    
    if (this.orientation === 'horizontal') {
      styles['border-top-width'] = `${this.thickness}px`;
      styles['margin-top'] = `${this.spacing}px`;
      styles['margin-bottom'] = `${this.spacing}px`;
    } else {
      styles['border-left-width'] = `${this.thickness}px`;
      styles['margin-left'] = `${this.spacing}px`;
      styles['margin-right'] = `${this.spacing}px`;
    }
    
    return styles;
  }
}