import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {
  AssessmentDiscussionService,
  DialogService
} from '../../services/';
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
} from '../../store/action/assessment-discussion.actions';
import { IAppState } from '../app.store';
import { IAssessmentDiscussion } from 'app/interfaces/assessment/assessment-discussion.interface';
import { IAssessmentDiscussionView } from 'app/interfaces/assessment/assessment-discussion-view.interface';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class AssessmentDiscussionActionCreator implements OnDestroy {

  private errorMessage: string = null;
  private getAssessmentDiscussionSubscription: Subscription = null;
  private createAssessmentDiscussionSubscription: Subscription = null;
  private getOneAssessmentDiscussionSubsscription: Subscription = null;
  private updateAssessmentDiscussionSubscription: Subscription = null;
  private deleteAssessmentDiscussionSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private assessmentDiscussionService: AssessmentDiscussionService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy () {
    (this.getAssessmentDiscussionSubscription) ? this.getAssessmentDiscussionSubscription.unsubscribe() : null;
    (this.createAssessmentDiscussionSubscription) ? this.createAssessmentDiscussionSubscription.unsubscribe() : null;
    (this.getAssessmentDiscussionSubscription) ? this.getAssessmentDiscussionSubscription.unsubscribe() : null;
    (this.updateAssessmentDiscussionSubscription) ? this.updateAssessmentDiscussionSubscription.unsubscribe() : null;
    (this.deleteAssessmentDiscussionSubscription) ? this.deleteAssessmentDiscussionSubscription.unsubscribe() : null;   
  }

  GetAssessmentDiscussion (assessmentId: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_GET_ATTEMPT });
    this.getAssessmentDiscussionSubscription = this.assessmentDiscussionService.GetAssessmentDiscussion(assessmentId)
    .map(data => this.sortByTime(data))
    .map(data => {
      let newData: IAssessmentDiscussionView[];
      newData = data.map(d => this.assessmentDiscussionToView(d))
      return newData;
    })
    .subscribe(
      (assessmentDiscussions: IAssessmentDiscussionView[]) => {
        this.ngRedux.dispatch({type: ASSESSMENT_DISCUSSION_GET_FULFILLED, payload: assessmentDiscussions});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateAssessmentDiscusssion (assessmentId: number, assessmentDiscussion: IAssessmentDiscussion) {
    this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_CREATE_ATTEMPT });
    this.createAssessmentDiscussionSubscription = this.assessmentDiscussionService.CreateAssessmentDiscussion(assessmentId, assessmentDiscussion)
    .map(data => this.assessmentDiscussionToView(data))
    .subscribe(
      (assessmentDiscussion: IAssessmentDiscussionView) => {
        this.ngRedux.dispatch({type: ASSESSMENT_DISCUSSION_CREATE_FULFILLED, payload: assessmentDiscussion});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_CREATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneAssessmentDiscussion (id: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_GET_ATTEMPT });
    this.getOneAssessmentDiscussionSubsscription = this.assessmentDiscussionService.GetOneAssessmentDiscussion(id)
    .map(data => this.assessmentDiscussionToView(data))
    .subscribe(
      (assessmentDiscussion: IAssessmentDiscussionView) => {
        const assessmentDiscussions = [assessmentDiscussion];
        this.ngRedux.dispatch({type: ASSESSMENT_DISCUSSION_GET_FULFILLED, payload: assessmentDiscussions});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateAssessmentDiscussion (id: number, assessmentDiscussion) {
    this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_UPDATE_ATTEMPT });
    this.updateAssessmentDiscussionSubscription = this.assessmentDiscussionService.UpdateAssessmentDiscussion(id, assessmentDiscussion)
    .map(data => this.assessmentDiscussionToView(data))
    .subscribe(
      (assessmentDiscussion: IAssessmentDiscussionView) => {
        this.ngRedux.dispatch({type: ASSESSMENT_DISCUSSION_UPDATE_FULFILLED, payload: assessmentDiscussion});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_UPDATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteAssessmentDiscussion (id: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_DELETE_ATTEMPT });
    this.deleteAssessmentDiscussionSubscription = this.assessmentDiscussionService.DeleteAssessmentDiscussion(id)
    .map(data => this.assessmentDiscussionToView(data))
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_DELETE_FULFILLED, payload: data });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DISCUSSION_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private assessmentDiscussionToView: Function = (data: IAssessmentDiscussion): IAssessmentDiscussionView => {
    let newData: IAssessmentDiscussionView
    newData = {
      id: data.id,
      InstructorId: data.InstructorId,
      idNumber: data.Instructor.User.idNumber,
      email: data.Instructor.User.email,
      lname: data.Instructor.User.lname,
      fname: data.Instructor.User.fname,
      AssessmentId: data.AssessmentId,
      discussion: data.discussion,
      createdAt: data.createdAt
    };
    return newData;
  };

  private sortByTime (discussions: IAssessmentDiscussion[]): IAssessmentDiscussion[] {
    const newDiscussions = _.sortBy(discussions, (d) => {
      return moment(d.createdAt);
    }).reverse();
    return newDiscussions;
  }

}
