import { tassign } from 'tassign';
import * as _ from 'lodash';

export const toggleUserCreate = (state, action) => {
  return tassign(state, {
    ...state
  });
};

export const userCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const userCreateFulfilled = (state, action) => {
  return tassign(state, {
    user: action.payload.user,
    spinner: false,
    error: ''
  });
};

export const userCreateFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    spinner: false,
    error: action.error
  });
};

export const userSigninFulfilled = (state, action) => {
  return tassign(state, {
    user: action.payload,
    spinner: false,
    error: ''
  })
};

export const userSigninFailed = (state, action) => {
  return tassign(state, {
    user: null,
    spinner: false,
    error: action.error
  });
};

export const userSessionDestroy = (state, action) => {
  return tassign(state, {
    user: null,
    spinner: false,
    error: ''
  });
};
