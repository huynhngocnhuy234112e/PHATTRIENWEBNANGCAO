import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearndirectiveComponent } from './learndirective.component';

describe('LearndirectiveComponent', () => {
  let component: LearndirectiveComponent;
  let fixture: ComponentFixture<LearndirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearndirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearndirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
