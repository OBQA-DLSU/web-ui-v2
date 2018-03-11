import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthenticationService } from './authentication.service';
import { CourseService } from './course.service';
import { SopiService } from './sopi.service';
import { MyClassService } from './my-class.service';
import { InvitationService } from './invitation.service';
import { DialogService } from './dialog.service';
import { InstructorService } from './instructor.service';
import { AssessmentService } from './assessment.service';
import { StudentService } from './student.service';
import { AssessmentDiscussionService } from './assessment-discussion.service';
import { GradeService } from './grade.service';
import { EvidenceService } from './evidence.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: []
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServiceModule,
      providers: [
        AuthenticationService,
        CourseService,
        SopiService,
        MyClassService,
        InvitationService,
        DialogService,
        InstructorService,
        AssessmentService,
        StudentService,
        AssessmentDiscussionService,
        GradeService,
        EvidenceService
      ]
    }
  }
}
