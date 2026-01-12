import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gpa } from './gpa';

describe('Gpa', () => {
  let component: Gpa;
  let fixture: ComponentFixture<Gpa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gpa],
    }).compileComponents();

    fixture = TestBed.createComponent(Gpa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute GPA correctly', () => {
    component.get_result('5', '10', '5');
    expect(component.resultText).toBe('GPA=6.00');
  });

  it('should show error for invalid input', () => {
    component.get_result('a', '10', '5');
    expect(component.resultText).toBe('vui long nhap so hop le');
  });

  it('should clear data', () => {
    const a = document.createElement('input');
    const b = document.createElement('input');
    const c = document.createElement('input');
    a.value = '1';
    b.value = '2';
    c.value = '3';
    component.resultText = 'GPA=1.23';
    component.clear_data(a, b, c);
    expect(a.value).toBe('');
    expect(b.value).toBe('');
    expect(c.value).toBe('');
    expect(component.resultText).toBe('');
  });
});
