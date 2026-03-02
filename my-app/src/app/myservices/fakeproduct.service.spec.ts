import { TestBed } from '@angular/core/testing';

import { FakeproductService } from './fakeproduct.service';

describe('FakeproductService', () => {
  let service: FakeproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
