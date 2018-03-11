import { tassign } from 'tassign';
import * as _ from 'lodash';



export const assessmentCreateAttempt = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: true
  });
};

export const assessmentCreateFulfilled = (state, action) => {
  return tassign(state, {
    assessments: [
      ...state.assessments,
      action.payload
    ],
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: ''
  });
};

export const assessmentCreateFailed = (state, action) => {
  return tassign(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const assessmentUpdateAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: true,
    error: ''
  });
};

export const assessmentUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.assessments, (a) => { return a.id == action.payload.id });
  let newArray = state.assessments.slice();
  newArray.splice(index, 1, action.payload);
  return tassign(state, {
    assessments: newArray,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: ''
  });
};

export const assessmentUpdateFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: action.error
  });
};

export const assessmentGetAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: true,
    error: ''
  });
};

export const assessmentGetFulfilled = (state, action) => {
  return tassign(state, {
    assessments: action.payload,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: ''
  });
};

export const assessmentGetFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: action.error
  });
};

export const assessmentDeleteAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: true,
    error: ''
  });
};

export const assessmentDeleteFulfilled = (state, action) => {
  const newArray = _.remove(state.assessments, (n) => {
    return n.id != action.payload.id;
  });
  return tassign(state, {
    assessments: newArray,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: ''
  });
};

export const assessmentDeleteFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: action.error
  });
};

export const assessmentSelectAttempt = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: true,
    error: ''
  });
};

export const assessmentSelectFulfilled = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: action.payload,
    spinner: false,
    error: ''
  });
};

export const assessmentSelectFailed = (state, action) => {
  return tassign(state, {
    assessments: state.assessments,
    selectedAssessment: state.selectedAssessment,
    spinner: false,
    error: action.error
  });
};
