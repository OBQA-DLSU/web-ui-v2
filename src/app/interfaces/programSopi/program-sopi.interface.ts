import { ISopi } from '../sopi/sopi.interface';
import { IProgram } from '../program/program.interface';

export interface IProgramSopi {
  id: number;
  code: string;
  name: string;
  SopiId: number;
  Sopi: ISopi;
  ProgramId: number;
  Program: IProgram;
  description: string;
}
