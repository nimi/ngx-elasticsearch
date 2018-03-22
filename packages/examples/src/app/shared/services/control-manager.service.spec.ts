import { TestBed, inject } from '@angular/core/testing';

import { ControlManagerService } from './control-manager.service';

describe('ControlManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlManagerService]
    });
  });

  it('should ...', inject([ControlManagerService], (service: ControlManagerService) => {
    expect(service).toBeTruthy();
  }));
});
