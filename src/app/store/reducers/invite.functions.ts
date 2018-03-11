import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sendInviteAttempt = (state, action) => {
  return tassign(state, {
    groupInviteStatus: state.groupInviteStatus,
    spinner: true,
    error: ''
  });
};

export const sendInvtesFulfilled = (state, action) => {
  return tassign(state, {
    groupInviteStatus: action.payload,
    spinner: false,
    error: ''
  });
};

export const sendInvtesFailed = (state, action) => {
  return tassign(state, {
    groupInviteStatus: state.groupInviteStatus,
    spinner: false,
    error: action.error
  });
};
