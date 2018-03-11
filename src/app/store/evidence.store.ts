import { IEvidenceView } from '../interfaces/evidence/evidence-view.interface';
import * as evidence from './reducers/evidence.functions';
import {
  EVIDENCE_CREATE_ATTEMPT,
  EVIDENCE_CREATE_FAILED,
  EVIDENCE_CREATE_FULFILLED,
  EVIDENCE_DELETE_ATTEMPT,
  EVIDENCE_DELETE_FAILED,
  EVIDENCE_DELETE_FULFILLED,
  EVIDENCE_GET_ATTEMPT,
  EVIDENCE_GET_FAILED,
  EVIDENCE_GET_FULFILLED,
  EVIDENCE_UPDATE_ATTEMPT,
  EVIDENCE_UPDATE_FAILED,
  EVIDENCE_UPDATE_FULFILLED
} from './action/evidence.actions';

export interface IEvidenceStore {
  Evidences: IEvidenceView[];
  spinner: boolean;
  error: string
}
export const EVIDENCE_INITIAL_STATE: IEvidenceStore = {
  Evidences: [],
  spinner: false,
  error: ''
}

export function evidenceReducer(state: IEvidenceStore = EVIDENCE_INITIAL_STATE, action): IEvidenceStore {
  switch (action.type) {
    case EVIDENCE_CREATE_ATTEMPT: evidence.evidenceCreateAttempt(state, action);
    case EVIDENCE_CREATE_FAILED: evidence.evidenceCreateFailed(state, action);
    case EVIDENCE_CREATE_FULFILLED: evidence.evidenceCreateFulfilled(state, action);
    case EVIDENCE_UPDATE_ATTEMPT: evidence.evidenceUpdateAttempt(state, action);
    case EVIDENCE_UPDATE_FAILED: evidence.evidenceUpdateFailed(state, action);
    case EVIDENCE_UPDATE_FULFILLED: evidence.evidenceUpdateFulfilled(state, action);
    case EVIDENCE_GET_ATTEMPT: evidence.evidenceGetAttempt(state, action);
    case EVIDENCE_GET_FAILED: evidence.evidenceGetFailed(state, action);
    case EVIDENCE_GET_FULFILLED: evidence.evidenceGetFulfilled(state, action);
    case EVIDENCE_DELETE_ATTEMPT: evidence.evidenceDeleteAttempt(state, action);
    case EVIDENCE_DELETE_FAILED: evidence.evidenceDeleteFailed(state, action);
    case EVIDENCE_DELETE_FULFILLED: evidence.evidenceDeleteFulfilled(state, action);
  }
  return state;
};
