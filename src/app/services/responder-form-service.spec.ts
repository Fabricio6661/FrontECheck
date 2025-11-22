import { TestBed } from '@angular/core/testing';

import { ResponderFormService } from './responder-form-service';

describe('ResponderFormService', () => {
  let service: ResponderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponderFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
