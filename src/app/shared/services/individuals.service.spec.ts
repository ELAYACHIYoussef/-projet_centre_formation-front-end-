import { TestBed } from '@angular/core/testing';

import { IndividusService } from './individuals.service';

describe('IndividualsService', () => {
  let service: IndividusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
