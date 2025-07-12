import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor = 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'lib-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
})
export class Switch implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() size: SwitchSize = 'md';
  @Input() color: SwitchColor = 'primary';
  @Input() disabled = false;
  @Input() required = false;
  @Input() showIcons = false;

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();

  value = false;
  switchId = `switch-${Math.random().toString(36).substr(2, 9)}`;
  labelId = `${this.switchId}-label`;
  descriptionId = `${this.switchId}-description`;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  get containerClasses(): string {
    return 'switch';
  }

  get switchClasses(): string {
    let classes = [
      'switch__button',
      `switch__button--${this.size}`,
      `switch__button--${this.color}`,
    ];

    if (this.value) {
      classes.push('switch__button--active');
    }

    if (this.disabled) {
      classes.push('switch__button--disabled');
    }

    return classes.join(' ');
  }

  get trackClasses(): string {
    return 'switch__track';
  }

  get thumbClasses(): string {
    let classes = ['switch__thumb', `switch__thumb--${this.size}`];

    if (this.value) {
      classes.push('switch__thumb--active');
    }

    return classes.join(' ');
  }

  get iconContainerClasses(): string {
    return 'switch__icon-container';
  }

  get iconClasses(): string {
    let classes = ['switch__icon', `switch__icon--${this.size}`];

    if (this.value) {
      classes.push('switch__icon--active');
    }

    return classes.join(' ');
  }

  get labelClasses(): string {
    let classes = ['switch__label'];

    if (this.disabled) {
      classes.push('switch__label--disabled');
    }

    return classes.join(' ');
  }

  get descriptionClasses(): string {
    let classes = ['switch__description'];

    if (this.disabled) {
      classes.push('switch__description--disabled');
    }

    return classes.join(' ');
  }

  toggle(): void {
    if (this.disabled) return;

    this.value = !this.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.onTouched();
    this.blurred.emit();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this.value = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
