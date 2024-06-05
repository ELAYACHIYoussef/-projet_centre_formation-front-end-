import { TestBed } from '@angular/core/testing';

import { InscriptionformateurexternService } from './inscriptionformateurextern.service';

describe('InscriptionformateurexternService', () => {
  let service: InscriptionformateurexternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionformateurexternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
