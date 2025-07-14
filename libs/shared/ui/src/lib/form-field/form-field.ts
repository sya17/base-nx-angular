import { Component, Input, ContentChild, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FormFieldAppearance = 'fill' | 'outline' | 'standard';

@Component({
  selector: 'lib-form-field',
  imports: [CommonModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField implements AfterContentInit {
  @Input() label = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;
  @Input() appearance: FormFieldAppearance = 'outline';
  @Input() disabled = false;

  @ContentChild('input') inputElement: any;

  ngAfterContentInit() {
    // Additional logic if needed
  }

  get fieldClasses(): string {
    let classes = ['form-field', `form-field--${this.appearance}`];
    
    if (this.disabled) {
      classes.push('form-field--disabled');
    }
    
    if (this.error) {
      classes.push('form-field--error');
    }
    
    return classes.join(' ');
  }
}