import { ISession } from '../interfaces/session/session.interface';
import {
  SESSION_CREATE_ATTEMPT,
  SESSION_CREATE_FULFILLED,
  SESSION_CREATE_FAILED,
  SESSION_DESTROY_FULFILLED,
  SESSION_CHECK_ATTEMPT,
  SESSION_CHECK_FULFILLED,
  SESSION_CHECK_FAILED,
  SESSION_UPDATE_FAILED,
  SESSION_UPDATE_FULFILLED,
  SESSION_PASSWORD_CHAGE_FULFILLED,
  SESSION_PASSWORD_CHANGE_ATTEMPT,
  SESSION_PASSWORD_CHANGE_FAILED
} from './action/session.actions';
import * as session from './reducers/session.functions';
export interface ISessionStore extends ISession {
  spinner: boolean;
  error: any;
}

export const SESSION_INITIAL_STATE: ISessionStore = {
  User: null,
  isStudent: null,
  isAdmin: null,
  ProgramId: null,
  InstructorId: null,
  Program: null,
  token: null,
  spinner: false,
  error: null
}

export function sessionReducer(state: ISessionStore = SESSION_INITIAL_STATE, action): ISessionStore {
  switch (action.type){
    case SESSION_CREATE_ATTEMPT: return session.sessionCreateAttempt(state, action);
    case SESSION_CREATE_FULFILLED: return session.sessionCreateFulfilled(state, action);
    case SESSION_CREATE_FAILED: return session.sessionCreateFailed(state, action);
    case SESSION_DESTROY_FULFILLED: return session.sessionDestroy(state, action);
    case SESSION_CHECK_ATTEMPT: return session.sessionCheckAttempt(state, action);
    case SESSION_CHECK_FULFILLED: return session.sessionCheckFulfilled(state, action);
    case SESSION_CHECK_FAILED: return session.sessionCheckFailed(state, action);
    case SESSION_UPDATE_FAILED: return session.sessionUpdateFailed(state, action);
    case SESSION_UPDATE_FULFILLED: return session.sessionUpdateFulfilled(state, action);
    case SESSION_PASSWORD_CHANGE_ATTEMPT: return session.sessionPasswordChangeAttempt(state, action);
    case SESSION_PASSWORD_CHAGE_FULFILLED: return session.sessionPasswordChangeFulfilled(state, action);
    case SESSION_PASSWORD_CHANGE_FAILED: return session.sessionPasswordChangeFailed(state, action);
  }
  return state;
};
