import { IAssessmentDiscussionView } from '../interfaces/assessment/assessment-discussion-view.interface';
import {
  ASSESSMENT_DISCUSSION_CREATE_ATTEMPT,
  ASSESSMENT_DISCUSSION_CREATE_FAILED,
  ASSESSMENT_DISCUSSION_CREATE_FULFILLED,
  ASSESSMENT_DISCUSSION_DELETE_ATTEMPT,
  ASSESSMENT_DISCUSSION_DELETE_FAILED,
  ASSESSMENT_DISCUSSION_DELETE_FULFILLED,
  ASSESSMENT_DISCUSSION_GET_ATTEMPT,
  ASSESSMENT_DISCUSSION_GET_FAILED,
  ASSESSMENT_DISCUSSION_GET_FULFILLED,
  ASSESSMENT_DISCUSSION_UPDATE_ATTEMPT,
  ASSESSMENT_DISCUSSION_UPDATE_FAILED,
  ASSESSMENT_DISCUSSION_UPDATE_FULFILLED
} from './action/assessment-discussion.actions';
import * as assessmentDiscussion from './reducers/assessment-discussion.functions';
export interface IAssessmentDiscussionStore {
  AssessmentDiscussions: Array<IAssessmentDiscussionView>;
  spinner: boolean;
  error: string;
};

export const ASSESSMENT_DISCUSSION_INITIAL_STORE: IAssessmentDiscussionStore = {
  AssessmentDiscussions: [],
  spinner: false,
  error: ''
};

export function assessmentDiscussionReducer(state: IAssessmentDiscussionStore = ASSESSMENT_DISCUSSION_INITIAL_STORE, action): IAssessmentDiscussionStore {
  switch (action.type){
    case ASSESSMENT_DISCUSSION_CREATE_ATTEMPT: return assessmentDiscussion.assessmentDiscussionCreateAttempt(state, action)
    case ASSESSMENT_DISCUSSION_CREATE_FAILED: return assessmentDiscussion.assessmentDiscussionCreateFailed(state, action);
    case ASSESSMENT_DISCUSSION_CREATE_FULFILLED: return assessmentDiscussion.assessmentDiscussionCreateFulfilled(state, action);
    case ASSESSMENT_DISCUSSION_GET_ATTEMPT: return assessmentDiscussion.assessmentDiscussionGetAttempt(state, action);
    case ASSESSMENT_DISCUSSION_GET_FAILED: return assessmentDiscussion.assessmentDiscussionGetFailed(state, action);
    case ASSESSMENT_DISCUSSION_GET_FULFILLED: return assessmentDiscussion.assessmentDiscussionGetFulfilled(state, action);
    case ASSESSMENT_DISCUSSION_UPDATE_ATTEMPT: return assessmentDiscussion.assessmentDiscussionUpdateAttempt(state, action);
    case ASSESSMENT_DISCUSSION_UPDATE_FAILED: return assessmentDiscussion.assessmentDiscussionUpdateFailed(state, action);
    case ASSESSMENT_DISCUSSION_UPDATE_FULFILLED: return assessmentDiscussion.assessmentDiscussionUpdateFulfilled(state, action);
    case ASSESSMENT_DISCUSSION_DELETE_ATTEMPT: return assessmentDiscussion.assessmentDiscussionDeleteAttempt(state, action);
    case ASSESSMENT_DISCUSSION_DELETE_FAILED: return assessmentDiscussion.assessmentDiscussionDeleteFailed(state, action);
    case ASSESSMENT_DISCUSSION_DELETE_FULFILLED: return assessmentDiscussion.assessmentDiscussionDeleteFulfilled(state, action);
  }
  return state;
};
