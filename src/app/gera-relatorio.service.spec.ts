import { TestBed } from '@angular/core/testing';

import { GeraRelatorioService } from './gera-relatorio.service';

describe('GeraRelatorioService', () => {
  let service: GeraRelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeraRelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
