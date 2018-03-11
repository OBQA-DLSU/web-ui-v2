
import {
  SEND_INVITES_ATTEMPT,
  SEND_INVITES_FAILED,
  SEND_INVITES_FULFILLED
} from './action/invite.actions';
import { IUserInvite } from '../interfaces/user/user-invite.interface';
import * as invite from './reducers/invite.functions';
export interface IInviteStore {
  groupInviteStatus: any;
  spinner: boolean;
  error: string;
}

export const INVITE_INITIAL_STATE: IInviteStore= {
  groupInviteStatus: null,
  spinner: false,
  error: ''
}

export function inviteReducer(state: IInviteStore = INVITE_INITIAL_STATE, action): IInviteStore {
  switch (action.type){
    case SEND_INVITES_ATTEMPT: return invite.sendInviteAttempt(state, action);
    case SEND_INVITES_FULFILLED: return invite.sendInvtesFulfilled(state, action);
    case SEND_INVITES_FAILED: return invite.sendInvtesFailed(state, action);
  }
  return state;
};
