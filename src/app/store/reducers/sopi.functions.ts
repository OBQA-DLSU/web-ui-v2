import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sopiCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const sopiCreateFulfilled = (state, action) => {
  return tassign(state, {
    sopis: [
      ...state.sopis,
      action.payload
    ],
    spinner: false,
    error: ''
  });
};

export const sopiCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const sopiUpdateAttempt = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    spinner: true,
    error: ''
  });
};

export const sopiUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.sopis, (c) => { return c.id == action.payload.id });
  let newArray = state.sopis.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    sopis: newArray,
    spinner: false,
    error: ''
  });
};

export const sopiUpdateFailed = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    spinner: false,
    error: action.error
  });
};

export const sopiGetAttempt = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    spinner: true,
    error: ''
  });
};

export const sopiGetFulfilled = (state, action) => {
  return tassign(state, {
    sopis: action.payload,
    spinner: false,
    error: ''
  });
};

export const sopiGetFailed = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    spinner: false,
    error: action.error
  });
};

export const sopiDeleteAttempt = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    spinner: true,
    error: ''
  });
};

export const sopiDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.sopis, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    sopis: newArray,
    spinner: false,
    error: ''
  });
};

export const sopiDeleteFailed = (state, action) => {
  return tassign(state, {
    sopis: state.sopis,
    spinner: false,
    error: action.error
  });
};
