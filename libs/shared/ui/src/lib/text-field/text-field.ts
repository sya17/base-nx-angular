import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputVariant = 'default' | 'filled' | 'floating';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-text-field',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextField),
      multi: true,
    },
  ],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() iconLeft = false;
  @Input() iconRight = false;
  @Input() clearable = false;
  @Input() helperText = '';
  @Input() errorMessage = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();

  value = '';
  inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  isFocused = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get containerClasses(): string {
    return 'input__container';
  }

  get inputClasses(): string {
    let classes = [
      'input__field',
      `input__field--${this.variant}`,
      `input__field--${this.size}`,
    ];

    if (this.iconLeft) {
      classes.push('input__field--icon-left');
    }

    if (this.iconRight || this.clearable) {
      classes.push('input__field--icon-right');
    }

    if (this.errorMessage) {
      classes.push('input__field--error');
    }

    if (this.disabled) {
      classes.push('input__field--disabled');
    }

    if (this.readonly) {
      classes.push('input__field--readonly');
    }

    if (this.variant === 'floating') {
      classes.push('input__field--floating');
    }

    return classes.join(' ');
  }

  get labelClasses(): string {
    let classes = ['input__label'];

    if (this.errorMessage) {
      classes.push('input__label--error');
    }

    return classes.join(' ');
  }

  get floatingLabelClasses(): string {
    let classes = ['input__floating-label'];

    if (this.value || this.isFocused) {
      classes.push('input__floating-label--active');
    }

    if (this.errorMessage) {
      classes.push('input__floating-label--error');
    } else if (this.value || this.isFocused) {
      classes.push('input__floating-label--focused');
    }

    return classes.join(' ');
  }

  get helperClasses(): string {
    let classes = ['input__helper'];

    if (this.errorMessage) {
      classes.push('input__helper--error');
    }

    return classes.join(' ');
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.isFocused = true;
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.blurred.emit();
  }

  clearValue(): void {
    this.value = '';
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
