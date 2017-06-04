import { TestBed, inject } from '@angular/core/testing';

import { ApplicationApiService } from './application-api.service';

describe('ApplicationApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationApiService]
    });
  });

  it('should be created', inject([ApplicationApiService], (service: ApplicationApiService) => {
    expect(service).toBeTruthy();
  }));
});
