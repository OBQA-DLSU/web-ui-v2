import { tassign } from 'tassign';
import * as _ from 'lodash';



export const studentCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const studentCreateFulfilled = (state, action) => {
  return tassign(state, {
    students: [
      ...state.students,
      action.payload
    ],
    spinner: false,
    error: ''
  });
};

export const studentCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const studentUpdateAttempt = (state, action) => {
  return tassign(state, {
    students: state.students,
    spinner: true,
    error: ''
  });
};

export const studentUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.students, (s) => { return s.id == action.payload.id });
  let newArray = state.students.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    students: newArray,
    spinner: false,
    error: ''
  });
};

export const studentUpdateFailed = (state, action) => {
  return tassign(state, {
    students: state.students,
    spinner: false,
    error: action.error
  });
};

export const studentGetAttempt = (state, action) => {
  return tassign(state, {
    students: state.students,
    spinner: true,
    error: ''
  });
};

export const studentGetFulfilled = (state, action) => {
  return tassign(state, {
    students: action.payload,
    spinner: false,
    error: ''
  });
};

export const studentGetFailed = (state, action) => {
  return tassign(state, {
    students: state.students,
    spinner: false,
    error: action.error
  });
};

export const studentDeleteAttempt = (state, action) => {
  return tassign(state, {
    students: state.students,
    spinner: true,
    error: ''
  });
};

export const studentDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.students, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    students: newArray,
    spinner: false,
    error: ''
  });
};

export const studentDeleteFailed = (state, action) => {
  return tassign(state, {
    students: state.students,
    spinner: false,
    error: action.error
  });
};

