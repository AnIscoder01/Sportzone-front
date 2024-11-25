import { TestBed } from '@angular/core/testing';

import { SallesdesportService } from './sallesdesport.service';

describe('SallesdesportService', () => {
  let service: SallesdesportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SallesdesportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
