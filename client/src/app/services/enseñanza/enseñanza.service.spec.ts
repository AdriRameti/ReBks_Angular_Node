import { TestBed } from '@angular/core/testing';

import { EnseñanzaService } from './enseñanza.service';

describe('EnseñanzaService', () => {
  let service: EnseñanzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseñanzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
