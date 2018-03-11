import { NgModule, ModuleWithProviders } from '@angular/core';

import { UserActionCreator } from './user.actioncreator';
import { SessionActionCreator } from './session.actioncreator';
import { CourseActionCreator } from './course.actioncreator';
import { SopiActionCreator } from './sopi.actioncreator';
import { MyClassActionCreator } from './my-class.actioncreator';
import { MiscActionCreator } from './misc.actioncreator';
import { InviteActionCreator } from './invite.actioncreator';
import { InstructorActionCreator } from './instructor.actioncreator';
import { AssessmentActionCreator } from './assessment.actioncreator';
import { StudentActionCreator } from './student.actioncreator';
import { AssessmentDiscussionActionCreator } from './assessment-discussion.actioncreator';
import { TableActionCreator } from './table.actioncreator';
import { GradeActionCreator } from './grade.actioncreator';
import { EvidenceActionCreator } from './evidence.actioncreator';

@NgModule({
  imports: [],
  declarations: []
})
export class ActionCreatorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ActionCreatorModule,
      providers: [
        UserActionCreator,
        SessionActionCreator,
        CourseActionCreator,
        SopiActionCreator,
        MyClassActionCreator,
        MiscActionCreator,
        InviteActionCreator,
        InstructorActionCreator,
        AssessmentActionCreator,
        StudentActionCreator,
        AssessmentDiscussionActionCreator,
        TableActionCreator,
        GradeActionCreator,
        EvidenceActionCreator
      ]
    }
  }
}