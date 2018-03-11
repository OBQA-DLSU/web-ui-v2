import { IAssessment } from '../assessment/assessment.interface';
export interface IMyClassAssessment {
  id?: number;
  MyClassId?: number;
  AssessmentId?: number;
  Assessment: IAssessment;
}