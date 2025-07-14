import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Icon } from './icon';

describe('Icon', () => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icon],
    }).compileComponents();

    fixture = TestBed.createComponent(Icon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon name', () => {
    component.name = 'home';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBe('home');
  });

  it('should apply correct size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.icon--lg')).toBeTruthy();
  });

  it('should apply custom size styles', () => {
    component.customSize = 48;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.style.fontSize).toBe('48px');
  });
});