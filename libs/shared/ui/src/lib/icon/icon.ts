import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'lib-icon',
  imports: [CommonModule],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  @Input() name = '';
  @Input() size: IconSize = 'md';
  @Input() color = '';
  @Input() customSize?: number;

  get iconClasses(): string {
    let classes = ['icon', `icon--${this.size}`];
    return classes.join(' ');
  }

  get iconStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    if (this.color) {
      styles['color'] = this.color;
    }
    
    if (this.customSize) {
      styles['font-size'] = `${this.customSize}px`;
      styles['width'] = `${this.customSize}px`;
      styles['height'] = `${this.customSize}px`;
    }
    
    return styles;
  }
}