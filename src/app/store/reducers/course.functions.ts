import { tassign } from 'tassign';
import * as _ from 'lodash';



export const courseCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const courseCreateFulfilled = (state, action) => {
  return tassign(state, {
    courses: [
      ...state.courses,
      action.payload
    ],
    spinner: false,
    error: ''
  });
};

export const courseCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const courseUpdateAttempt = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    spinner: true,
    error: ''
  });
};

export const courseUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.courses, (c) => { return c.id == action.payload.id });
  let newArray = state.courses.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    courses: newArray,
    spinner: false,
    error: ''
  });
};

export const courseUpdateFailed = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    spinner: false,
    error: action.error
  });
};

export const courseGetAttempt = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    spinner: true,
    error: ''
  });
};

export const courseGetFulfilled = (state, action) => {
  return tassign(state, {
    courses: action.payload,
    spinner: false,
    error: ''
  });
};

export const courseGetFailed = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    spinner: false,
    error: action.error
  });
};

export const courseDeleteAttempt = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    spinner: true,
    error: ''
  });
};

export const courseDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.courses, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    courses: newArray,
    spinner: false,
    error: ''
  });
};

export const courseDeleteFailed = (state, action) => {
  return tassign(state, {
    courses: state.courses,
    spinner: false,
    error: action.error
  });
};
