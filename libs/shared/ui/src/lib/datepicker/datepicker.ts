import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'lib-datepicker',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Datepicker),
      multi: true,
    },
  ],
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
})
export class Datepicker implements OnInit, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Select date';
  @Input() disabled = false;
  @Input() required = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() format = 'dd/mm/yyyy';
  @Input() errorMessage = '';

  @Output() dateChange = new EventEmitter<Date | null>();

  value: Date | null = null;
  inputId = `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  isOpen = false;
  showMonthPicker = false;
  showYearPicker = false;

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  calendarDays: CalendarDate[] = [];
  yearRange: number[] = [];

  private onChange = (value: Date | null) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.generateYearRange();
    this.generateCalendarDays();
  }

  get displayValue(): string {
    if (!this.value) return '';
    return this.formatDate(this.value);
  }

  get inputClasses(): string {
    let classes = ['datepicker__input'];

    if (this.errorMessage) {
      classes.push('datepicker__input--error');
    }

    if (this.disabled) {
      classes.push('datepicker__input--disabled');
    }

    return classes.join(' ');
  }

  get calendarClasses(): string {
    return 'datepicker__calendar';
  }

  toggleCalendar(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.showMonthPicker = false;
      this.showYearPicker = false;
      if (this.value) {
        this.currentMonth = this.value.getMonth();
        this.currentYear = this.value.getFullYear();
      }
      this.generateCalendarDays();
    }
  }

  closeCalendar(): void {
    this.isOpen = false;
    this.showMonthPicker = false;
    this.showYearPicker = false;
    this.onTouched();
  }

  toggleMonthPicker(): void {
    this.showMonthPicker = !this.showMonthPicker;
    this.showYearPicker = false;
  }

  toggleYearPicker(): void {
    this.showYearPicker = !this.showYearPicker;
    this.showMonthPicker = false;
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
  }

  selectMonth(month: number): void {
    this.currentMonth = month;
    this.showMonthPicker = false;
    this.generateCalendarDays();
  }

  selectYear(year: number): void {
    this.currentYear = year;
    this.showYearPicker = false;
    this.generateCalendarDays();
  }

  selectDate(day: CalendarDate): void {
    if (day.isDisabled) return;

    this.value = day.date;
    this.onChange(this.value);
    this.dateChange.emit(this.value);
    this.closeCalendar();
  }

  selectToday(): void {
    const today = new Date();
    this.value = today;
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.onChange(this.value);
    this.dateChange.emit(this.value);
    this.generateCalendarDays();
    this.closeCalendar();
  }

  clearDate(): void {
    this.value = null;
    this.onChange(this.value);
    this.dateChange.emit(this.value);
    this.closeCalendar();
  }

  private generateCalendarDays(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === this.currentMonth;
      const isToday = this.isSameDay(date, new Date());
      const isSelected = this.value ? this.isSameDay(date, this.value) : false;
      const isDisabled = this.isDateDisabled(date);

      this.calendarDays.push({
        date,
        isCurrentMonth,
        isToday,
        isSelected,
        isDisabled,
      });
    }
  }

  private generateYearRange(): void {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;

    this.yearRange = [];
    for (let year = startYear; year <= endYear; year++) {
      this.yearRange.push(year);
    }
  }

  private isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.minDate) return true;
    if (this.maxDate && date > this.maxDate) return true;
    return false;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return this.format
      .replace('dd', day)
      .replace('mm', month)
      .replace('yyyy', year.toString());
  }

  getDayButtonClasses(day: CalendarDate): string {
    let classes = ['datepicker__day'];

    if (!day.isCurrentMonth) {
      classes.push('datepicker__day--other-month');
    } else if (day.isSelected) {
      classes.push('datepicker__day--selected');
    } else if (day.isToday) {
      classes.push('datepicker__day--today');
    }

    if (day.isDisabled) {
      classes.push('datepicker__day--disabled');
    }

    return classes.join(' ');
  }

  getMonthButtonClasses(month: number): string {
    let classes = ['datepicker__month-btn'];

    if (month === this.currentMonth) {
      classes.push('datepicker__month-btn--selected');
    }

    return classes.join(' ');
  }

  getYearButtonClasses(year: number): string {
    let classes = ['datepicker__year-btn'];

    if (year === this.currentYear) {
      classes.push('datepicker__year-btn--selected');
    }

    return classes.join(' ');
  }

  // ControlValueAccessor implementation
  writeValue(value: Date | null): void {
    this.value = value;
    if (value) {
      this.currentMonth = value.getMonth();
      this.currentYear = value.getFullYear();
      this.generateCalendarDays();
    }
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
