import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
  icon?: string;
}

export type DropdownSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-dropdown',
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Dropdown),
      multi: true,
    },
  ],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown implements OnInit, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Select option';
  @Input() options: DropdownOption[] = [];
  @Input() size: DropdownSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  @Input() searchable = false;
  @Input() clearable = false;
  @Input() multiple = false;
  @Input() maxHeight = '200px';
  @Input() errorMessage = '';

  @Output() selectionChange = new EventEmitter<any>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  value: any = null;
  inputId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
  isOpen = false;
  searchTerm = '';
  filteredOptions: DropdownOption[] = [];

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.filteredOptions = [...this.options];
  }

  get selectedOption(): DropdownOption | null {
    if (this.multiple) return null;
    return this.options.find((option) => option.value === this.value) || null;
  }

  get buttonClasses(): string {
    let classes = ['dropdown__button', `dropdown__button--${this.size}`];

    if (this.isOpen) {
      classes.push('dropdown__button--open');
    }

    if (this.errorMessage) {
      classes.push('dropdown__button--error');
    }

    if (this.disabled) {
      classes.push('dropdown__button--disabled');
    }

    return classes.join(' ');
  }

  get selectedTextClasses(): string {
    return this.selectedOption
      ? 'dropdown__selected-text'
      : 'dropdown__placeholder-text';
  }

  get arrowClasses(): string {
    let classes = ['dropdown__arrow'];

    if (this.isOpen) {
      classes.push('dropdown__arrow--open');
    }

    return classes.join(' ');
  }

  get menuClasses(): string {
    return 'dropdown__menu';
  }

  get optionsContainerClasses(): string {
    return 'dropdown__options';
  }

  toggleDropdown(): void {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.isOpen = true;
    this.searchTerm = '';
    this.filteredOptions = [...this.options];
    this.opened.emit();
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.closed.emit();
  }

  selectOption(option: DropdownOption): void {
    if (option.disabled) return;

    if (this.multiple) {
      // Handle multiple selection
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.findIndex((val) => val === option.value);

      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }

      this.value = currentValues;
    } else {
      this.value = option.value;
      this.closeDropdown();
    }

    this.onChange(this.value);
    this.selectionChange.emit(this.value);
  }

  isSelected(option: DropdownOption): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(option.value);
    }
    return this.value === option.value;
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(term)
    );
  }

  onBlur(): void {
    this.onTouched();
  }

  trackByValue(index: number, option: DropdownOption): any {
    return option.value;
  }

  getOptionClasses(option: DropdownOption): string {
    let classes = ['dropdown__option'];

    if (option.disabled) {
      classes.push('dropdown__option--disabled');
    } else if (this.isSelected(option)) {
      classes.push('dropdown__option--selected');
    }

    return classes.join(' ');
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
