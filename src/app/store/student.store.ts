import { IStudentView } from '../interfaces/student/student-view.interface';
import {
  STUDENT_CREATE_ATTEMPT,
  STUDENT_CREATE_FULFILLED,
  STUDENT_CREATE_FAILED,
  STUDENT_DELETE_ATTEMPT,
  STUDENT_DELETE_FAILED,
  STUDENT_DELETE_FULFILLED,
  STUDENT_GET_ATTEMPT,
  STUDENT_GET_FAILED,
  STUDENT_GET_FULFILLED,
  STUDENT_UPDATE_ATTEMPT,
  STUDENT_UPDATE_FAILED,
  STUDENT_UPDATE_FULFILLED
} from './action/student.action';
import * as student from './reducers/student.functions';

export interface IStudentStore {
  Students: IStudentView[];
  spinner: boolean;
  error: string;
}

export const STUDENT_INITIAL_STATE: IStudentStore = {
  Students: [],
  spinner: false,
  error: ''
}

export function studentReducer (state: IStudentStore = STUDENT_INITIAL_STATE, action) {
  switch (action.type) {
    case STUDENT_CREATE_ATTEMPT: return student.studentCreateAttempt(state, action);
    case STUDENT_CREATE_FAILED: return student.studentCreateFailed(state, action);
    case STUDENT_CREATE_FULFILLED: return student.studentCreateFulfilled(state, action);
    case STUDENT_GET_ATTEMPT: return student.studentGetAttempt(state, action);
    case STUDENT_GET_FAILED: return student.studentGetFailed(state, action);
    case STUDENT_GET_FULFILLED: return student.studentGetFulfilled(state, action);
    case STUDENT_UPDATE_ATTEMPT: return student.studentUpdateAttempt(state, action);
    case STUDENT_UPDATE_FAILED: return student.studentUpdateFailed(state, action);
    case STUDENT_UPDATE_FULFILLED: return student.studentUpdateFulfilled(state, action);
    case STUDENT_DELETE_ATTEMPT: return student.studentDeleteAttempt(state, action);
    case STUDENT_DELETE_FAILED: return student.studentDeleteFailed(state, action);
    case STUDENT_DELETE_FULFILLED: return student.studentDeleteFulfilled(state, action);
  }
  return state;
}
