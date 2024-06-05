import { TestBed } from '@angular/core/testing';

import { FormationResolverService } from './formation-resolver.service';

describe('FormationResolverService', () => {
  let service: FormationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
