import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ptb1Component } from './ptb1.component';

describe('Ptb1Component', () => {
  let component: Ptb1Component;
  let fixture: ComponentFixture<Ptb1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ptb1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ptb1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
