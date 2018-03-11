import { IAssessmentDiscussionView } from './assessment-discussion-view.interface';
export interface IAssessmentView {
  id?: number;
  assessmentLevel?: number;
  assessmentTask?: string;
  target?: number;
  passingGrade?: number;
  performance?: number;
  improvementPlan?: string;
  term?: number;
  academicYear?: string;
  cycle?: number;
  ProgramId?: number;
  ProgramSopiId?: number;
  ProgramCourseId?: number;
  Program?: string;
  Sopi?: string;
  Course?: string;
  AssessmentDiscussions?: IAssessmentDiscussionView[]
}
