import { TestBed } from '@angular/core/testing';

import { SolicitudMesaService } from './solicitud-mesa.service';

describe('SolicitudMesaService', () => {
  let service: SolicitudMesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudMesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
