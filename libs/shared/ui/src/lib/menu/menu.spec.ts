import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu, MenuItem } from './menu';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  const mockItems: MenuItem[] = [
    { id: '1', label: 'Item 1', icon: 'home' },
    { id: '2', label: 'Item 2', disabled: true },
    { id: '3', label: '', divider: true },
    { id: '4', label: 'Item 3' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    component.items = mockItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible when closed', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.menu--open')).toBeFalsy();
  });

  it('should be visible when open', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.menu--open')).toBeTruthy();
  });

  it('should emit itemClicked when item is clicked', () => {
    spyOn(component.itemClicked, 'emit');
    component.onItemClick(mockItems[0]);
    expect(component.itemClicked.emit).toHaveBeenCalledWith(mockItems[0]);
  });

  it('should not emit itemClicked for disabled items', () => {
    spyOn(component.itemClicked, 'emit');
    component.onItemClick(mockItems[1]); // disabled item
    expect(component.itemClicked.emit).not.toHaveBeenCalled();
  });
});