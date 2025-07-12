import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressVariant = 'default' | 'gradient' | 'striped' | 'glow';
export type ProgressSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProgressColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

@Component({
  selector: 'lib-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress implements OnInit, OnDestroy {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() size: ProgressSize = 'md';
  @Input() variant: ProgressVariant = 'default';
  @Input() color: ProgressColor = 'primary';
  @Input() label = '';
  @Input() showLabel = false;
  @Input() showPercentage = false;
  @Input() showInnerLabel = false;
  @Input() unit = '%';
  @Input() indeterminate = false;
  @Input() animated = false;
  @Input() steps?: { label: string; value: number }[];

  private animationId?: number;

  ngOnInit(): void {
    if (this.animated && this.indeterminate) {
      this.startAnimation();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  get percentage(): number {
    if (this.indeterminate) return 100;
    return Math.max(
      0,
      Math.min(100, ((this.value - this.min) / (this.max - this.min)) * 100)
    );
  }

  get displayValue(): number {
    return this.unit === '%' ? Math.round(this.percentage) : this.value;
  }

  get containerClasses(): string {
    return 'progress';
  }

  get trackClasses(): string {
    return `progress__track progress__track--${this.size}`;
  }

  get fillClasses(): string {
    let classes = [
      'progress__fill',
      `progress__fill--${this.variant}`,
      `progress__fill--${this.color}`,
    ];

    if (this.indeterminate) {
      classes.push('progress__fill--indeterminate');
    }

    return classes.join(' ');
  }

  get bufferClasses(): string {
    return 'progress__buffer';
  }

  get labelClasses(): string {
    return 'progress__label';
  }

  get percentageClasses(): string {
    return 'progress__percentage';
  }

  get innerLabelClasses(): string {
    return 'progress__inner-label';
  }

  getStepClasses(index: number): string {
    return 'progress__step';
  }

  stepDotClasses(index: number): string {
    const progress = this.getStepProgress(index);
    return `progress__step-dot progress__step-dot--${progress} progress__step-dot--${this.color}`;
  }

  stepLabelClasses(index: number): string {
    const progress = this.getStepProgress(index);
    return `progress__step-label progress__step-label--${progress} progress__step-label--${this.color}`;
  }

  getStepProgress(index: number): 'completed' | 'current' | 'pending' {
    if (!this.steps) return 'pending';

    const step = this.steps[index];
    if (this.value >= step.value) return 'completed';

    // Check if this is the current step
    const prevStep = this.steps[index - 1];
    if (!prevStep || this.value >= prevStep.value) return 'current';

    return 'pending';
  }

  private startAnimation(): void {
    // Add subtle animation for indeterminate progress
    const animate = () => {
      if (this.indeterminate && this.animated) {
        this.animationId = requestAnimationFrame(animate);
      }
    };
    animate();
  }
}
