import { IUser } from '../user/user.interface';
import { IProgram } from '../program/program.interface';

export interface IStudent {
  id?: number;
  isAdmin?: boolean;
  User?: IUser;
  ProgramId?: number;
  Program?: IProgram;
}
