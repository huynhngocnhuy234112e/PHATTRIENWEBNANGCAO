import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listproduct1Component } from './listproduct1.component';

describe('Listproduct1Component', () => {
  let component: Listproduct1Component;
  let fixture: ComponentFixture<Listproduct1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Listproduct1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listproduct1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
