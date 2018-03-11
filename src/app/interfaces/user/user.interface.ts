import { IStudent } from '../student/student.interface';
import { IInstructor } from '../instructor/instructor.interface';
import { IRole } from '../role/role.interface';

export interface IUser {
  id?: number;
  idNumber: string;
  Role?: IRole;
  RoleId?: number;
  Instructors?: IInstructor[];
  Students?: IStudent[];
  fname?: string;
  lname?: string;
  email: string;
}
