import { TestBed } from '@angular/core/testing';

import { PrrprietairesService } from './prrprietaires.service';

describe('PrrprietairesService', () => {
  let service: PrrprietairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrrprietairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
