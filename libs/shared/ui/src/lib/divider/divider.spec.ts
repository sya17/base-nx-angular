import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Divider } from './divider';

describe('Divider', () => {
  let component: Divider;
  let fixture: ComponentFixture<Divider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Divider],
    }).compileComponents();

    fixture = TestBed.createComponent(Divider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply horizontal orientation by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.divider--horizontal')).toBeTruthy();
  });

  it('should apply vertical orientation when set', () => {
    component.orientation = 'vertical';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.divider--vertical')).toBeTruthy();
  });

  it('should apply solid variant by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.divider--solid')).toBeTruthy();
  });

  it('should apply custom color', () => {
    component.color = 'red';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const div = compiled.querySelector('div');
    expect(div?.style.borderColor).toBe('red');
  });
});