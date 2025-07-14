import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormField } from './form-field';

describe('FormField', () => {
  let component: FormField;
  let fixture: ComponentFixture<FormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormField],
    }).compileComponents();

    fixture = TestBed.createComponent(FormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label when provided', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    
    const labelElement = fixture.nativeElement.querySelector('.form-field__label');
    expect(labelElement.textContent.trim()).toBe('Test Label');
  });

  it('should show required indicator when required is true', () => {
    component.label = 'Test Label';
    component.required = true;
    fixture.detectChanges();
    
    const requiredElement = fixture.nativeElement.querySelector('.form-field__required');
    expect(requiredElement).toBeTruthy();
    expect(requiredElement.textContent.trim()).toBe('*');
  });

  it('should display error message when provided', () => {
    component.error = 'Test error message';
    fixture.detectChanges();
    
    const errorElement = fixture.nativeElement.querySelector('.form-field__error');
    expect(errorElement.textContent.trim()).toBe('Test error message');
  });

  it('should display hint when provided and no error', () => {
    component.hint = 'Test hint message';
    fixture.detectChanges();
    
    const hintElement = fixture.nativeElement.querySelector('.form-field__hint');
    expect(hintElement.textContent.trim()).toBe('Test hint message');
  });

  it('should hide hint when error is present', () => {
    component.hint = 'Test hint message';
    component.error = 'Test error message';
    fixture.detectChanges();
    
    const hintElement = fixture.nativeElement.querySelector('.form-field__hint');
    expect(hintElement).toBeFalsy();
  });
});