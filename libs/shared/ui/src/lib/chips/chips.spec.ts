import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Chips } from './chips';

describe('Chips', () => {
  let component: Chips;
  let fixture: ComponentFixture<Chips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chips],
    }).compileComponents();

    fixture = TestBed.createComponent(Chips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit chipClicked when chip is clicked', () => {
    const mockItem = { id: 1, label: 'Test Chip' };
    component.items = [mockItem];
    spyOn(component.chipClicked, 'emit');

    component.onChipClick(mockItem);

    expect(component.chipClicked.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should emit chipRemoved when remove button is clicked', () => {
    const mockItem = { id: 1, label: 'Test Chip', removable: true };
    component.items = [mockItem];
    spyOn(component.chipRemoved, 'emit');
    const mockEvent = new Event('click');

    component.onRemoveChip(mockItem, mockEvent);

    expect(component.chipRemoved.emit).toHaveBeenCalledWith(mockItem);
  });

  it('should not emit events when disabled', () => {
    const mockItem = { id: 1, label: 'Test Chip', disabled: true };
    component.items = [mockItem];
    spyOn(component.chipClicked, 'emit');
    spyOn(component.chipRemoved, 'emit');

    component.onChipClick(mockItem);
    component.onRemoveChip(mockItem, new Event('click'));

    expect(component.chipClicked.emit).not.toHaveBeenCalled();
    expect(component.chipRemoved.emit).not.toHaveBeenCalled();
  });
});