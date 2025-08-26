import { TestBed } from '@angular/core/testing';

import { VapiService } from './vapi.service';

describe('VapiService', () => {
  let service: VapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
