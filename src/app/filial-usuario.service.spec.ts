import { TestBed } from '@angular/core/testing';

import { FilialUsuarioService } from './filial-usuario.service';

describe('FilialUsuarioService', () => {
  let service: FilialUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilialUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
