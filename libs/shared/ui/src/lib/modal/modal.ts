import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() size: ModalSize = 'md';
  @Input() closable = true;
  @Input() closeOnBackdrop = true;
  @Input() title = '';

  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  private keydownListener?: (event: KeyboardEvent) => void;

  ngOnInit(): void {
    if (this.isOpen) {
      this.setupKeyboardListener();
      this.opened.emit();
    }
  }

  ngOnDestroy(): void {
    this.removeKeyboardListener();
    // Restore body scroll
    document.body.style.overflow = '';
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.setupKeyboardListener();
      this.opened.emit();
      document.body.style.overflow = 'hidden';
    } else {
      this.removeKeyboardListener();
      document.body.style.overflow = '';
    }
  }

  get hasHeader(): boolean {
    return true; // Will be determined by content projection
  }

  get hasFooter(): boolean {
    return true; // Will be determined by content projection
  }

  get backdropClasses(): string {
    return 'modal__backdrop';
  }

  get modalClasses(): string {
    return `modal__container modal__container--${this.size}`;
  }

  get headerClasses(): string {
    return 'modal__header';
  }

  get contentClasses(): string {
    return 'modal__content';
  }

  get footerClasses(): string {
    return 'modal__footer';
  }

  open(): void {
    this.isOpen = true;
    this.setupKeyboardListener();
    this.opened.emit();
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    if (!this.closable) return;

    this.isOpen = false;
    this.removeKeyboardListener();
    this.closed.emit();
    document.body.style.overflow = '';
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  private setupKeyboardListener(): void {
    this.keydownListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.keydownListener);
  }

  private removeKeyboardListener(): void {
    if (this.keydownListener) {
      document.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = undefined;
    }
  }
}
