import { tassign } from 'tassign';
import * as _ from 'lodash';

export const evidenceCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const evidenceCreateFulfilled = (state, action) => {
  return tassign(state, {
    evidences: [
      ...state.evidences,
      action.payload
    ],
    spinner: false,
    error: ''
  });
};

export const evidenceCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const evidenceUpdateAttempt = (state, action) => {
  return tassign(state, {
    evidences: state.evidences,
    spinner: true,
    error: ''
  });
};

export const evidenceUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.evidences, (e) => { return e.id == action.payload.id });
  let newArray = state.evidences.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    evidences: newArray,
    spinner: false,
    error: ''
  });
};

export const evidenceUpdateFailed = (state, action) => {
  return tassign(state, {
    evidences: state.evidences,
    spinner: false,
    error: action.error
  });
};

export const evidenceGetAttempt = (state, action) => {
  return tassign(state, {
    evidences: state.evidences,
    spinner: true,
    error: ''
  });
};

export const evidenceGetFulfilled = (state, action) => {
  return tassign(state, {
    evidences: action.payload,
    spinner: false,
    error: ''
  });
};

export const evidenceGetFailed = (state, action) => {
  return tassign(state, {
    evidences: state.evidences,
    spinner: false,
    error: action.error
  });
};

export const evidenceDeleteAttempt = (state, action) => {
  return tassign(state, {
    evidences: state.evidences,
    spinner: true,
    error: ''
  });
};

export const evidenceDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.evidences, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    evidences: newArray,
    spinner: false,
    error: ''
  });
};

export const evidenceDeleteFailed = (state, action) => {
  return tassign(state, {
    evidences: state.evidences,
    spinner: false,
    error: action.error
  });
};
