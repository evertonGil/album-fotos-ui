import { TestBed, inject } from '@angular/core/testing';

import { MdcService } from './mdc.service';

describe('MdcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdcService]
    });
  });

  it('should be created', inject([MdcService], (service: MdcService) => {
    expect(service).toBeTruthy();
  }));
});
