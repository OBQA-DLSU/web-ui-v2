import { IInstructorView } from '../interfaces/instructor/instructor-view.interface';
import {
  INSTRUCTOR_CREATE_ATTEMPT,
  INSTRUCTOR_CREATE_FAILED,
  INSTRUCTOR_CREATE_FULFILLED,
  INSTRUCTOR_DELETE_ATTEMPT,
  INSTRUCTOR_DELETE_FAILED,
  INSTRUCTOR_DELETE_FULFILLED,
  INSTRUCTOR_GET_ATTEMPT,
  INSTRUCTOR_GET_FAILED,
  INSTRUCTOR_GET_FULFILLED,
  INSTRUCTOR_UPDATE_ATTEMPT,
  INSTRUCTOR_UPDATE_FAILED,
  INSTRUCTOR_UPDATE_FULFILLED
} from './action/instructor.actions';
import * as instructor from './reducers/instructor.functions';
export interface IInstructorStore {
  Instructors: Array<IInstructorView>;
  spinner: boolean;
  error: string;
}

export const INSTRUCTOR_INITIAL_STATE: IInstructorStore = {
  Instructors: [],
  spinner: false,
  error: ''
}

export function instructorReducer(state: IInstructorStore = INSTRUCTOR_INITIAL_STATE, action): IInstructorStore {
  switch (action.type){
    case INSTRUCTOR_CREATE_ATTEMPT: return instructor.instructorCreateAttempt(state, action);
    case INSTRUCTOR_CREATE_FAILED: return instructor.instructorCreateFailed(state, action);
    case INSTRUCTOR_CREATE_FULFILLED: return instructor.instructorDeleteFulfilled(state, action);
    case INSTRUCTOR_DELETE_ATTEMPT: return instructor.instructorDeleteAttempt(state, action);
    case INSTRUCTOR_DELETE_FAILED: return instructor.instructorDeleteFailed(state, action);
    case INSTRUCTOR_DELETE_FULFILLED: return instructor.instructorDeleteFulfilled(state, action);
    case INSTRUCTOR_GET_ATTEMPT: return instructor.instructorGetAttempt(state, action);
    case INSTRUCTOR_GET_FAILED: return instructor.instructorGetFailed(state, action);
    case INSTRUCTOR_GET_FULFILLED: return instructor.instructorGetFulfilled(state, action);
    case INSTRUCTOR_UPDATE_ATTEMPT: return instructor.instructorUpdateAttempt(state, action);
    case INSTRUCTOR_UPDATE_FAILED: return instructor.instructorUpdateFailed(state, action);
    case INSTRUCTOR_UPDATE_FULFILLED: return instructor.instructorUpdateFulfilled(state, action);
  }
  return state;
};
