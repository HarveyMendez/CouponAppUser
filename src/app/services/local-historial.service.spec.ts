import { TestBed } from '@angular/core/testing';

import { LocalHistorialService } from './local-historial.service';

describe('LocalHistorialService', () => {
  let service: LocalHistorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalHistorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
