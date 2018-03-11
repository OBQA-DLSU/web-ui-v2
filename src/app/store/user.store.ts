import { IUser } from '../interfaces/user/user.interface';
import * as user from './reducers/user.functions';
import {
  USER_CREATE_ATTEMPT,
  USER_CREATE_FULFILLED,
  USER_CREATE_FAILED,
  TOGGLE_USER_CREATE,
  USER_SIGNIN_FULFILLED,
  USER_SIGNIN_FAILED,
  USER_SESSION_DESTROY
} from './action/user.action';

export interface IUserStore {
  User: IUser;
  spinner: boolean;
  error: string
}
export const USER_INITIAL_STATE: IUserStore = {
  User: null,
  spinner: false,
  error: ''
}

export function userReducer(state: IUserStore = USER_INITIAL_STATE, action): IUserStore {
  switch (action.type){
    case USER_CREATE_ATTEMPT: return user.userCreateAttempt(state, action);
    case USER_CREATE_FULFILLED: return user.userCreateFulfilled(state, action);
    case USER_CREATE_FAILED: return user.userCreateFailed(state, action);
    case TOGGLE_USER_CREATE: return user.toggleUserCreate(state, action);
    case USER_SIGNIN_FULFILLED: return user.userSigninFulfilled(state, action);
    case USER_SIGNIN_FAILED: return user.userSigninFailed(state, action);
    case USER_SESSION_DESTROY: return user.userSessionDestroy(state, action);
  }
  return state;
};
