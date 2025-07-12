import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SliderOrientation = 'horizontal' | 'vertical';
export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'lib-slider',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Slider),
      multi: true,
    },
  ],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 0;
  @Input() range = false;
  @Input() rangeLow = 0;
  @Input() rangeHigh = 100;
  @Input() orientation: SliderOrientation = 'horizontal';
  @Input() size: SliderSize = 'md';
  @Input() color: SliderColor = 'primary';
  @Input() disabled = false;
  @Input() required = false;
  @Input() showValue = true;
  @Input() showTooltip = false;
  @Input() unit = '';
  @Input() marks?: { value: number; label?: string }[];
  @Input() helperText = '';
  @Input() errorMessage = '';

  @Output() valueChange = new EventEmitter<number | [number, number]>();
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();

  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLElement>;
  @ViewChild('thumb') thumb?: ElementRef<HTMLElement>;
  @ViewChild('thumbLow') thumbLow?: ElementRef<HTMLElement>;
  @ViewChild('thumbHigh') thumbHigh?: ElementRef<HTMLElement>;

  sliderId = `slider-${Math.random().toString(36).substr(2, 9)}`;
  isDragging = false;
  activeThumb: 'single' | 'low' | 'high' | null = null;

  private onChange = (value: number | [number, number]) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.validateValues();
  }

  ngOnDestroy(): void {
    this.removeGlobalListeners();
  }

  get containerClasses(): string {
    let classes = ['slider'];

    if (this.orientation === 'vertical') {
      classes.push('slider--vertical');
    }

    return classes.join(' ');
  }

  get sliderContainerClasses(): string {
    let classes = [
      'slider__container',
      `slider__container--${this.orientation}`,
      `slider__container--${this.size}`,
    ];

    if (this.disabled) {
      classes.push('slider__container--disabled');
    }

    return classes.join(' ');
  }

  get trackClasses(): string {
    return `slider__track slider__track--${this.orientation} slider__track--${this.size}`;
  }

  get fillClasses(): string {
    return `slider__fill slider__fill--${this.orientation} slider__fill--${this.color}`;
  }

  get thumbClasses(): string {
    let classes = [
      'slider__thumb',
      `slider__thumb--${this.size}`,
      `slider__thumb--${this.color}`,
    ];

    if (this.disabled) {
      classes.push('slider__thumb--disabled');
    }

    return classes.join(' ');
  }

  get tooltipClasses(): string {
    return `slider__tooltip slider__tooltip--${this.orientation}`;
  }

  get markClasses(): string {
    return 'slider__mark';
  }

  get markDotClasses(): string {
    return 'slider__mark-dot';
  }

  get markLabelClasses(): string {
    return 'slider__mark-label';
  }

  get helperClasses(): string {
    let classes = ['slider__helper'];

    if (this.errorMessage) {
      classes.push('slider__helper--error');
    }

    return classes.join(' ');
  }

  get displayValue(): number {
    return this.value;
  }

  get displayRangeValue(): string {
    return `${this.rangeLow} - ${this.rangeHigh}`;
  }

  get fillStyle(): { [key: string]: string } {
    if (this.range) {
      const lowPercent = this.getPercentage(this.rangeLow);
      const highPercent = this.getPercentage(this.rangeHigh);

      if (this.orientation === 'vertical') {
        return {
          bottom: `${lowPercent}%`,
          height: `${highPercent - lowPercent}%`,
        };
      } else {
        return {
          left: `${lowPercent}%`,
          width: `${highPercent - lowPercent}%`,
        };
      }
    } else {
      const percent = this.getPercentage(this.value);
      if (this.orientation === 'vertical') {
        return {
          bottom: '0%',
          height: `${percent}%`,
        };
      } else {
        return {
          left: '0%',
          width: `${percent}%`,
        };
      }
    }
  }

  getThumbStyle(value: number): { [key: string]: string } {
    const percent = this.getPercentage(value);
    if (this.orientation === 'vertical') {
      return {
        bottom: `${percent}%`,
        left: '50%',
      };
    } else {
      return {
        left: `${percent}%`,
        top: '50%',
      };
    }
  }

  getMarkStyle(value: number): { [key: string]: string } {
    const percent = this.getPercentage(value);
    if (this.orientation === 'vertical') {
      return {
        bottom: `${percent}%`,
        left: '50%',
        transform: 'translateX(-50%)',
      };
    } else {
      return {
        left: `${percent}%`,
        top: '50%',
        transform: 'translateX(-50%)',
      };
    }
  }

  private getPercentage(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private getValueFromPercentage(percent: number): number {
    const value = this.min + (percent / 100) * (this.max - this.min);
    return this.snapToStep(value);
  }

  private snapToStep(value: number): number {
    const snapped =
      Math.round((value - this.min) / this.step) * this.step + this.min;
    return Math.max(this.min, Math.min(this.max, snapped));
  }

  private validateValues(): void {
    this.value = this.snapToStep(
      Math.max(this.min, Math.min(this.max, this.value))
    );
    this.rangeLow = this.snapToStep(
      Math.max(this.min, Math.min(this.max, this.rangeLow))
    );
    this.rangeHigh = this.snapToStep(
      Math.max(this.min, Math.min(this.max, this.rangeHigh))
    );

    if (this.range && this.rangeLow > this.rangeHigh) {
      [this.rangeLow, this.rangeHigh] = [this.rangeHigh, this.rangeLow];
    }
  }

  onMouseDown(event: MouseEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    this.startDragging(event.clientX, event.clientY);
    this.addGlobalListeners();
  }

  onTouchStart(event: TouchEvent): void {
    if (this.disabled) return;

    event.preventDefault();
    const touch = event.touches[0];
    this.startDragging(touch.clientX, touch.clientY);
    this.addGlobalListeners();
  }

  private startDragging(clientX: number, clientY: number): void {
    const rect = this.sliderContainer.nativeElement.getBoundingClientRect();
    let percent: number;

    if (this.orientation === 'vertical') {
      percent = ((rect.bottom - clientY) / rect.height) * 100;
    } else {
      percent = ((clientX - rect.left) / rect.width) * 100;
    }

    percent = Math.max(0, Math.min(100, percent));
    const newValue = this.getValueFromPercentage(percent);

    if (this.range) {
      const distToLow = Math.abs(newValue - this.rangeLow);
      const distToHigh = Math.abs(newValue - this.rangeHigh);

      this.activeThumb = distToLow <= distToHigh ? 'low' : 'high';

      if (this.activeThumb === 'low') {
        this.rangeLow = Math.min(newValue, this.rangeHigh);
      } else {
        this.rangeHigh = Math.max(newValue, this.rangeLow);
      }

      this.onChange([this.rangeLow, this.rangeHigh]);
      this.valueChange.emit([this.rangeLow, this.rangeHigh]);
    } else {
      this.activeThumb = 'single';
      this.value = newValue;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }

    this.isDragging = true;
  }

  private addGlobalListeners(): void {
    document.addEventListener('mousemove', this.onGlobalMouseMove);
    document.addEventListener('mouseup', this.onGlobalMouseUp);
    document.addEventListener('touchmove', this.onGlobalTouchMove);
    document.addEventListener('touchend', this.onGlobalTouchEnd);
  }

  private removeGlobalListeners(): void {
    document.removeEventListener('mousemove', this.onGlobalMouseMove);
    document.removeEventListener('mouseup', this.onGlobalMouseUp);
    document.removeEventListener('touchmove', this.onGlobalTouchMove);
    document.removeEventListener('touchend', this.onGlobalTouchEnd);
  }

  private onGlobalMouseMove = (event: MouseEvent): void => {
    if (!this.isDragging) return;
    this.updateValueFromPosition(event.clientX, event.clientY);
  };

  private onGlobalTouchMove = (event: TouchEvent): void => {
    if (!this.isDragging) return;
    const touch = event.touches[0];
    this.updateValueFromPosition(touch.clientX, touch.clientY);
  };

  private onGlobalMouseUp = (): void => {
    this.stopDragging();
  };

  private onGlobalTouchEnd = (): void => {
    this.stopDragging();
  };

  private updateValueFromPosition(clientX: number, clientY: number): void {
    const rect = this.sliderContainer.nativeElement.getBoundingClientRect();
    let percent: number;

    if (this.orientation === 'vertical') {
      percent = ((rect.bottom - clientY) / rect.height) * 100;
    } else {
      percent = ((clientX - rect.left) / rect.width) * 100;
    }

    percent = Math.max(0, Math.min(100, percent));
    const newValue = this.getValueFromPercentage(percent);

    if (this.range && this.activeThumb) {
      if (this.activeThumb === 'low') {
        this.rangeLow = Math.min(newValue, this.rangeHigh);
      } else if (this.activeThumb === 'high') {
        this.rangeHigh = Math.max(newValue, this.rangeLow);
      }

      this.onChange([this.rangeLow, this.rangeHigh]);
      this.valueChange.emit([this.rangeLow, this.rangeHigh]);
    } else if (!this.range) {
      this.value = newValue;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  private stopDragging(): void {
    this.isDragging = false;
    this.activeThumb = null;
    this.removeGlobalListeners();
  }

  onKeyDown(event: KeyboardEvent, thumb: 'single' | 'low' | 'high'): void {
    if (this.disabled) return;

    let delta = 0;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -this.step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = this.step;
        break;
      case 'Home':
        delta =
          this.min -
          (this.range
            ? thumb === 'low'
              ? this.rangeLow
              : this.rangeHigh
            : this.value);
        break;
      case 'End':
        delta =
          this.max -
          (this.range
            ? thumb === 'low'
              ? this.rangeLow
              : this.rangeHigh
            : this.value);
        break;
      case 'PageDown':
        delta = -this.step * 10;
        break;
      case 'PageUp':
        delta = this.step * 10;
        break;
      default:
        return;
    }

    event.preventDefault();

    if (this.range) {
      if (thumb === 'low') {
        this.rangeLow = this.snapToStep(
          Math.max(this.min, Math.min(this.rangeHigh, this.rangeLow + delta))
        );
      } else if (thumb === 'high') {
        this.rangeHigh = this.snapToStep(
          Math.min(this.max, Math.max(this.rangeLow, this.rangeHigh + delta))
        );
      }

      this.onChange([this.rangeLow, this.rangeHigh]);
      this.valueChange.emit([this.rangeLow, this.rangeHigh]);
    } else {
      this.value = this.snapToStep(
        Math.max(this.min, Math.min(this.max, this.value + delta))
      );
      this.onChange(this.value);
      this.valueChange.emit(this.value);
    }
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.onTouched();
    this.blurred.emit();
  }

  // ControlValueAccessor implementation
  writeValue(value: number | [number, number]): void {
    if (Array.isArray(value)) {
      this.rangeLow = value[0];
      this.rangeHigh = value[1];
    } else {
      this.value = value || 0;
    }
    this.validateValues();
  }

  registerOnChange(fn: (value: number | [number, number]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
