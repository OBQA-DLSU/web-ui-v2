import { TestBed, inject } from '@angular/core/testing';

import { AssessmentDiscussionService } from './assessment-discussion.service';

describe('AssessmentDiscussionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentDiscussionService]
    });
  });

  it('should be created', inject([AssessmentDiscussionService], (service: AssessmentDiscussionService) => {
    expect(service).toBeTruthy();
  }));
});
