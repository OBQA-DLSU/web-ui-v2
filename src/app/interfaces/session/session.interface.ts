import { IUser } from '../user/user.interface';
import { IProgram } from '../program/program.interface';
export interface ISession {
	User: IUser;
	token: string;
	isStudent?: boolean;
	Program?: IProgram;
	ProgramId?: number;
	InstructorId?: number;
	isAdmin?: boolean;
}
