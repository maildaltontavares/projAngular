import { TestBed } from '@angular/core/testing';

import { RelServiceService } from './rel-service.service';

describe('RelServiceService', () => {
  let service: RelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
