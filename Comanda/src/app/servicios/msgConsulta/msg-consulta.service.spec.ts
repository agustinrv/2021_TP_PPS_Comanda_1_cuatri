import { TestBed } from '@angular/core/testing';

import { MsgConsultaService } from './msg-consulta.service';

describe('MsgConsultaService', () => {
  let service: MsgConsultaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgConsultaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
