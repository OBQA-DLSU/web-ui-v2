import { tassign } from 'tassign';
import * as _ from 'lodash';

export const sessionCreateAttempt = (state, action) => {
  return tassign(state, {
    User: state.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: state.token,
    spinner: true,
    error: null
  });
};

export const sessionCreateFulfilled = (state, action) => {
  return tassign( state, {
    User: action.payload.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: action.payload.token,
    spinner: false,
    error: null
  });
};

export const sessionCreateFailed = (state, action) => {
  return tassign( state, {
    User: state.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: state.token,
    spinner: true,
    error: action.error
  });
};

export const sessionCheckAttempt = (state, action) => {
  return tassign(state, {
    User: state.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: state.token,
    spinner: true,
    error: null
  });
};

export const sessionCheckFulfilled = (state, action) => {
  return tassign(state, {
    isStudent: action.payload.isStudent,
    isAdmin: action.payload.isAdmin,
    ProgramId: action.payload.ProgramId,
    Program: action.payload.Program,
    InstructorId: action.payload.InstructorId,
    User: action.payload.User,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionCheckFailed = (state, action) => {
  return tassign(state, {
    User: state.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionDestroy = (state, action) => {
  return tassign(state, {
    User: null,
    isStudent: null,
    isAdmin: null,
    ProgramId: null,
    InstructorId: null,
    Program: null,
    token: null,
    spinner: false,
    error: ''
  });
};

export const sessionUpdateAttempt = (state, action) => {
  return tassign(state, {
    User: state.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: state.token,
    spinner: true,
    error: null
  });
};

export const sessionUpdateFulfilled = (state, action) => {
  const index = _.findIndex(state.User.Instructors, (i) => { return i.ProgramId === action.payload.ProgramId });
  return tassign(state, {
    User: state.User,
    isStudent: action.payload.isStudent,
    isAdmin: action.payload.isAdmin,
    ProgramId: action.payload.ProgramId,
    InstructorId: state.User.Instructors[index].id,
    Program: action.payload.Program,
    token: state.token,
    spinner: false,
    error: null
  });
};

export const sessionUpdateFailed = (state, action) => {
  return tassign(state, {
    User: state.User,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    ProgramId: state.ProgramId,
    InstructorId: state.InstructorId,
    Program: state.Program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};

export const sessionPasswordChangeAttempt = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: true,
    error: ''
  });
};

export const sessionPasswordChangeFulfilled = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: action.payload.token,
    spinner: false,
    error: ''
  });
};

export const sessionPasswordChangeFailed = (state, action) => {
  return tassign(state, {
    user: state.user,
    isStudent: state.isStudent,
    isAdmin: state.isAdmin,
    programId: state.programId,
    instructorId: state.instructorId,
    program: state.program,
    token: state.token,
    spinner: false,
    error: action.error
  });
};
