import { TestBed, inject } from '@angular/core/testing';

import { MyClassService } from './my-class.service';

describe('MyClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyClassService]
    });
  });

  it('should be created', inject([MyClassService], (service: MyClassService) => {
    expect(service).toBeTruthy();
  }));
});
