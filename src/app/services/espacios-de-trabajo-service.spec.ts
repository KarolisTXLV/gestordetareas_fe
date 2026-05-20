import { TestBed } from '@angular/core/testing';

import { EspaciosDeTrabajoService } from './espacios-de-trabajo-service';

describe('EspaciosDeTrabajoService', () => {
  let service: EspaciosDeTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaciosDeTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
