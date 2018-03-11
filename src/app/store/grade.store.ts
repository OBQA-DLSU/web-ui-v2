import { IGradeView } from '../interfaces/grade/grade-view.interface';
import * as grade from './reducers/grade.functions';
import {
  GRADE_CREATE_ATTEMPT,
  GRADE_CREATE_FAILED,
  GRADE_CREATE_FULFILLED,
  GRADE_DELETE_ATTEMPT,
  GRADE_DELETE_FAILED,
  GRADE_DELETE_FULFILLED,
  GRADE_GET_ATTEMPT,
  GRADE_GET_FAILED,
  GRADE_GET_FULFILLED,
  GRADE_UPDATE_ATTEMPT,
  GRADE_UPDATE_FAILED,
  GRADE_UPDATE_FULFILLED
} from './action/grade.actions';

export interface IGradeStore {
  Grades: IGradeView[];
  spinner: boolean;
  error: string
}
export const GRADE_INITIAL_STATE: IGradeStore = {
  Grades: [],
  spinner: false,
  error: ''
}

export function gradeReducer(state: IGradeStore = GRADE_INITIAL_STATE, action): IGradeStore {
  switch (action.type) {
    case GRADE_CREATE_ATTEMPT: return grade.gradeCreateAttempt(state, action);
    case GRADE_CREATE_FAILED: return grade.gradeCreateFailed(state, action);
    case GRADE_CREATE_FULFILLED: return grade.gradeCreateFulfilled(state, action);
    case GRADE_GET_ATTEMPT: return grade.gradeGetAttempt(state, action);
    case GRADE_GET_FAILED: return grade.gradeGetFailed(state, action);
    case GRADE_GET_FULFILLED: return grade.gradeGetFulfilled(state, action);
    case GRADE_UPDATE_ATTEMPT: return grade.gradeUpdateAttempt(state, action);
    case GRADE_UPDATE_FAILED: return grade.gradeUpdateFailed(state, action);
    case GRADE_UPDATE_FULFILLED: return grade.gradeUpdateFulfilled(state, action);
    case GRADE_DELETE_ATTEMPT: return grade.gradeDeleteAttempt(state, action);
    case GRADE_DELETE_FAILED: return grade.gradeDeleteFailed(state, action);
    case GRADE_DELETE_FULFILLED: return grade.gradeDeleteFulfilled(state, action);
  }
  return state;
};
