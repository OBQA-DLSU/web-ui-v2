import { IProgram } from '../program/program.interface';
import { IProgramSopi } from '../programSopi/program-sopi.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IAssessmentDiscussion } from './assessment-discussion.interface';
export interface IAssessment {
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
  Program?: IProgram;
  ProgramSopi?: IProgramSopi;
  ProgramCourse?: IProgramCourse;
  AssessmentDiscussions?: IAssessmentDiscussion[];
}
