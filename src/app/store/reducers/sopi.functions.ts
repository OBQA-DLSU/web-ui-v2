import { tassign } from 'tassign';
import * as _ from 'lodash';
import { ISopiStore } from '../sopi.store';

export const sopiCreateAttempt = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    ...state,
    spinner: true
  });
};

export const sopiCreateFulfilled = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: [
      ...state.Sopis,
      action.payload
    ],
    spinner: false,
    error: null
  });
};

export const sopiCreateFailed = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    ...state,
    spinner: false,
    error: action.error
  });
};

export const sopiUpdateAttempt = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: true,
    error: null
  });
};

export const sopiUpdateFulfilled = (state: ISopiStore, action: any) => {
  const index = _.findIndex(state.Sopis, (c) => { return c.id == action.payload.id });
  let newArray = state.Sopis.slice();
  newArray.splice(index, 1, action.payload);
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: newArray,
    spinner: false,
    error: null
  });
};

export const sopiUpdateFailed = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: false,
    error: action.error
  });
};

export const sopiGetAttempt = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: true,
    error: null
  });
};

export const sopiGetFulfilled = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: action.payload,
    spinner: false,
    error: null
  });
};

export const sopiGetFailed = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: false,
    error: action.error
  });
};

export const sopiDeleteAttempt = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: true,
    error: null
  });
};

export const sopiDeleteFulfilled = (state: ISopiStore, action: any) => {
  const newArray = _.remove(state.Sopis, (n) => {
    return n.id != action.payload.id;
  });
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: newArray,
    spinner: false,
    error: null
  });
};

export const sopiDeleteFailed = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: false,
    error: action.error
  });
};

export const sopiBulkCreateAttempt = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: true,
    error: null
  });
};

export const sopiBulkCreateFulfilled = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: false,
    error: null
  });
};

export const sopiBulkCreateFailed = (state: ISopiStore, action: any) => {
  return tassign<ISopiStore, ISopiStore>(state, {
    Sopis: state.Sopis,
    spinner: false,
    error: action.error
  });
};
