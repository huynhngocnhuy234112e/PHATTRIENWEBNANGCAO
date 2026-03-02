import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybindingComponent } from './mybinding.component';

describe('MybindingComponent', () => {
  let component: MybindingComponent;
  let fixture: ComponentFixture<MybindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
