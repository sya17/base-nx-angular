import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="active" class="tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .tab-content {
        display: block;
      }
    `,
  ],
})
export class Tab {
  @Input() id!: string;
  @Input() label!: string;
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() badge?: string | number;
  @Input() active = false;
}
