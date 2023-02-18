import { TestBed } from '@angular/core/testing';

import { X01Service } from './x01.service';

describe('X01Service', () => {
  let service: X01Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(X01Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
