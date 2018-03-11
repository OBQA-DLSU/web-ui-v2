import { IInstructorView } from '../instructor/instructor-view.interface';
export interface IMyClassView {
  id: number;
  InstructorId: number;
  Instructor?: IInstructorView;
  ProgramId: number;
  Program?: string;
  ProgramCourseId: number;
  Course?: string;
  term: number;
  academicYear: string;
  cycle: number;
  Students?: Array<any>;
  Assessments?: Array<any>;
}
