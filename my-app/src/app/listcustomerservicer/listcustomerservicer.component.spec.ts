import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcustomerservicerComponent } from './listcustomerservicer.component';

describe('ListcustomerservicerComponent', () => {
  let component: ListcustomerservicerComponent;
  let fixture: ComponentFixture<ListcustomerservicerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcustomerservicerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcustomerservicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
