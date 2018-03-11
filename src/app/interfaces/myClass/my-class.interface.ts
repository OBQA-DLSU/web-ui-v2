import { IInstructor } from '../instructor/instructor.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IStudent } from '../student/student.interface';
import { IProgram } from '../program/program.interface';
import { IMyClassStudent } from './my-class-student.interface';
import { IMyClassAssessment } from './my-class-assessment.interface';
export interface IMyClass {
  id: number;
  InstructorId: number;
  Instructor: IInstructor;
  ProgramId: number;
  Program: IProgram;
  ProgramCourseId: number;
  ProgramCourse: IProgramCourse;
  term: number;
  academicYear: string;
  cycle: number;
  MyClassStudents: IMyClassStudent[];
  MyClassAssessments: IMyClassAssessment[];
}
