import { IStudent } from '../student/student.interface';

export interface IMyClassStudent {
  id?: number;
  StudentId?: number;
  MyClassId?: number;
  Student?: IStudent;
}
