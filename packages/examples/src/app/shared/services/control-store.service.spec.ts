import { TestBed, inject } from '@angular/core/testing';

import { ControlStoreService } from './control-store.service';

describe('ControlStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlStoreService]
    });
  });

  it('should ...', inject([ControlStoreService], (service: ControlStoreService) => {
    expect(service).toBeTruthy();
  }));
});
