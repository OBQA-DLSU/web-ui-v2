import { tassign } from 'tassign';
import * as _ from 'lodash';
import { ICourseStore } from '../course.store';


export const courseCreateAttempt = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    ...state,
    spinner: true
  });
};

export const courseCreateFulfilled = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: [
      ...state.Courses,
      action.payload
    ],
    spinner: false,
    error: ''
  });
};

export const courseCreateFailed = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const courseUpdateAttempt = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: true,
    error: ''
  });
};

export const courseUpdateFulfilled = (state: ICourseStore, action: any) => {
  const index = _.findIndex(state.Courses, (c) => { return c.id == action.payload.id });
  let newArray = state.Courses.slice();
  newArray.splice(index, 1, action.payload);
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: newArray,
    spinner: false,
    error: ''
  });
};

export const courseUpdateFailed = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: false,
    error: action.error
  });
};

export const courseGetAttempt = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: true,
    error: ''
  });
};

export const courseGetFulfilled = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: action.payload,
    spinner: false,
    error: ''
  });
};

export const courseGetFailed = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: false,
    error: action.error
  });
};

export const courseDeleteAttempt = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: true,
    error: ''
  });
};

export const courseDeleteFulfilled = (state: ICourseStore, action: any) => {
  const newArray = _.remove(state.Courses, (n) => {
    return n.id != action.payload.id;
  });
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: newArray,
    spinner: false,
    error: ''
  });
};

export const courseDeleteFailed = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: false,
    error: action.error
  });
};

export const courseBulkCreateAttempt = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: true,
    error: state.error
  });
}

export const courseBulkCreateFulfilled = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: false,
    error: state.error
  });
}

export const courseBulkCreateFailed = (state: ICourseStore, action: any) => {
  return tassign<ICourseStore, ICourseStore>(state, {
    Courses: state.Courses,
    spinner: false,
    error: action.error
  });
};
