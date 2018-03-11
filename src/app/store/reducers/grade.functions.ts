import { tassign } from 'tassign';
import * as _ from 'lodash';

export const gradeCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const gradeCreateFulfilled = (state, action) => {
  return tassign(state, {
    grades: [
      ...state.grades,
      action.payload
    ],
    spinner: false,
    error: ''
  });
};

export const gradeCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const gradeUpdateAttempt = (state, action) => {
  return tassign(state, {
    grades: state.grades,
    spinner: true,
    error: ''
  });
};

export const gradeUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.grades, (g) => { return g.id == action.payload.id });
  let newArray = state.grades.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    grades: newArray,
    spinner: false,
    error: ''
  });
};

export const gradeUpdateFailed = (state, action) => {
  return tassign(state, {
    grades: state.grades,
    spinner: false,
    error: action.error
  });
};

export const gradeGetAttempt = (state, action) => {
  return tassign(state, {
    grades: state.grades,
    spinner: true,
    error: ''
  });
};

export const gradeGetFulfilled = (state, action) => {
  return tassign(state, {
    grades: action.payload,
    spinner: false,
    error: ''
  });
};

export const gradeGetFailed = (state, action) => {
  return tassign(state, {
    grades: state.grades,
    spinner: false,
    error: action.error
  });
};

export const gradeDeleteAttempt = (state, action) => {
  return tassign(state, {
    grades: state.grades,
    spinner: true,
    error: ''
  });
};

export const gradeDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.grades, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    grades: newArray,
    spinner: false,
    error: ''
  });
};

export const gradeDeleteFailed = (state, action) => {
  return tassign(state, {
    grades: state.grades,
    spinner: false,
    error: action.error
  });
};
