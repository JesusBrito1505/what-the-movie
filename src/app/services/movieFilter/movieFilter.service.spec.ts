import { TestBed } from '@angular/core/testing';

import { MovieFilterService } from './movieFilter.service';

describe('MovieFilterService', () => {
  let service: MovieFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
