import { TestBed } from '@angular/core/testing';

import { GrupoDescService } from './grupo-desc.service';

describe('GrupoDescService', () => {
  let service: GrupoDescService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoDescService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
