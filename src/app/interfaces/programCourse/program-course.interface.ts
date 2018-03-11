import { ICourse } from '../course/course.interface';
import { IProgram } from '../program/program.interface';

export interface IProgramCourse {
  id: number;
  ProgramId: number;
  CourseId: number;
  Program: IProgram;
  Course: ICourse;
  description: string;
  toBeAssessed: boolean;
}
