import { IProgram } from '../program/program.interface';
import { IAssessment } from '../assessment/assessment.interface';
import { IMyClass } from '../myClass/my-class.interface';
import { IProgramCourse } from '../programCourse/program-course.interface';
import { IProgramSopi } from '../programSopi/program-sopi.interface';

export interface IEvidence {
  id?: number;
  name?: string,
  publicId?: string,
  eTag?: string,
  url?: string,
  securedUrl?: string,
  mimeType?: string;
  type?: string;
  ProgramId?: number;
  Program?: IProgram;
  AssessmentId?: number;
  Assessment?: IAssessment;
  MyClassId?: number;
  MyClass?: IMyClass;
  ProgramCourseId?: number;
  ProgramCourse?: IProgramCourse;
  ProgramSopiId?: number;
  ProgramSopi?: IProgramSopi;
}
