import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface IToast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast implements OnInit, OnDestroy {
  @Input() position: ToastPosition = 'top-right';
  @Input() maxToasts = 5;

  @Output() toastRemoved = new EventEmitter<string>();

  toasts: IToast[] = [];
  private timers = new Map<string, any>();
  private progressIntervals = new Map<string, any>();
  private progressValues = new Map<string, number>();

  ngOnInit(): void {
    // Subscribe to toast service if you have one
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  get containerClasses(): string {
    return `toast-container toast-container--${this.position}`;
  }

  toastClasses(toast: IToast): string {
    return `toast toast--${toast.type}`;
  }

  iconClasses(type: ToastType): string {
    return `toast__icon toast__icon--${type}`;
  }

  titleClasses(type: ToastType): string {
    return 'toast__title';
  }

  messageClasses(type: ToastType): string {
    return 'toast__message';
  }

  actionButtonClasses(type: ToastType): string {
    return `toast__action toast__action--${type}`;
  }

  addToast(toast: Omit<IToast, 'id'>): void {
    const newToast: IToast = {
      ...toast,
      id: this.generateId(),
      duration: toast.duration ?? 5000,
    };

    // Remove oldest toast if we've reached the limit
    if (this.toasts.length >= this.maxToasts) {
      const oldestToast = this.toasts[0];
      this.removeToast(oldestToast.id);
    }

    this.toasts.push(newToast);

    // Set auto-remove timer if not persistent
    if (!newToast.persistent && newToast.duration) {
      this.setAutoRemove(newToast.id, newToast.duration);
      this.startProgress(newToast.id, newToast.duration);
    }
  }

  removeToast(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.clearTimer(id);
    this.clearProgress(id);
    this.toastRemoved.emit(id);
  }

  private setAutoRemove(id: string, duration: number): void {
    const timer = setTimeout(() => {
      this.removeToast(id);
    }, duration);

    this.timers.set(id, timer);
  }

  private startProgress(id: string, duration: number): void {
    this.progressValues.set(id, 100);

    const interval = setInterval(() => {
      const current = this.progressValues.get(id) || 0;
      const decrement = (100 / duration) * 100; // Update every 100ms
      const newValue = Math.max(0, current - decrement);

      this.progressValues.set(id, newValue);

      if (newValue <= 0) {
        this.clearProgress(id);
      }
    }, 100);

    this.progressIntervals.set(id, interval);
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }

  private clearProgress(id: string): void {
    const interval = this.progressIntervals.get(id);
    if (interval) {
      clearInterval(interval);
      this.progressIntervals.delete(id);
    }
    this.progressValues.delete(id);
  }

  private clearAllTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.progressIntervals.forEach((interval) => clearInterval(interval));
    this.timers.clear();
    this.progressIntervals.clear();
    this.progressValues.clear();
  }

  getProgress(id: string): number {
    return this.progressValues.get(id) || 100;
  }

  trackByToast(index: number, toast: IToast): string {
    return toast.id;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Public methods for programmatic usage
  success(title: string, message?: string, options?: Partial<IToast>): void {
    this.addToast({ type: 'success', title, message, ...options });
  }

  error(title: string, message?: string, options?: Partial<IToast>): void {
    this.addToast({ type: 'error', title, message, ...options });
  }

  warning(title: string, message?: string, options?: Partial<IToast>): void {
    this.addToast({ type: 'warning', title, message, ...options });
  }

  info(title: string, message?: string, options?: Partial<IToast>): void {
    this.addToast({ type: 'info', title, message, ...options });
  }
}
