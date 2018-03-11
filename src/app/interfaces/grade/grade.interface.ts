import { IStudent } from '../student/student.interface';
import { IInstructor } from '../instructor/instructor.interface';
import { IProgramSopi } from '../programSopi/program-sopi.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IAssessment } from '../assessment/assessment.interface';
import { IMyClass } from '../myClass/my-class.interface';

export interface IGrade {
  id: number;
  academicYear?: string;
  term?: number;
  cycle?: number;
  Student?: IStudent;
  StudentId?: number;
  Instructor?: IInstructor;
  InstructorId?: number;
  ProgramCourse?: IProgramCourse;
  ProgramCourseId?: number;
  ProgramSopi?: IProgramSopi;
  ProgramSopiId?: number;
  Assessment?: IAssessment;
  AssessmentId?: number;
  MyClass?: IMyClass;
  MyClassId?: number;
  grade: number;
}
