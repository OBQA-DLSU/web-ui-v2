import { IInstructor } from '../instructor/instructor.interface';
export interface IAssessmentDiscussion {
  id?: number;
  InstructorId?: number;
  Instructor?: IInstructor;
  AssessmentId?: number;
  discussion?: string;
  createdAt?: any;
}
