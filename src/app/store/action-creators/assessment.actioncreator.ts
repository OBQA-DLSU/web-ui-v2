import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/expand';
import {
  AssessmentService,
  DialogService
} from '../../services/';
import { IAppState } from '../app.store';
import {
  ASSESSMENT_CREATE_ATTEMPT,
  ASSESSMENT_CREATE_FAILED,
  ASSESSMENT_CREATE_FULFILLED,
  ASSESSMENT_DELETE_ATTEMPT,
  ASSESSMENT_DELETE_FAILED,
  ASSESSMENT_DELETE_FULFILLED,
  ASSESSMENT_GET_ATTEMPT,
  ASSESSMENT_GET_FAILED,
  ASSESSMENT_GET_FULFILLED,
  ASSESSMENT_UPDATE_ATTEMPT,
  ASSESSMENT_UPDATE_FAILED,
  ASSESSMENT_UPDATE_FULFILLED,
  ASSESSMENT_SELECT_ATTEMPT,
  ASSESSMENT_SELECT_FAILED,
  ASSESSMENT_SELECT_FULFILLED
} from '../action/assessment.actions';
import { MiscActionCreator } from './misc.actioncreator';
import { IAssessmentView } from '../../interfaces/assessment/assessment-view.interface';
import { IAssessment } from '../../interfaces/assessment/assessment.interface';

@Injectable()

export class AssessmentActionCreator implements OnDestroy {

  private errorMessage: string;
  private getAssessmentSubscription: Subscription = null;
  private createAssessmentSubscription: Subscription = null;
  private getFilteredAssessmentByProgramSubscription: Subscription = null;
  private getAllAssessmentSubscription: Subscription = null;
  private getFilteredAssessmentSubscription: Subscription = null;
  private getOneAssessmentSubscription: Subscription = null;
  private updateAssessmentSubscription: Subscription = null;
  private deleteAssessmentSubscription: Subscription = null;
  private getAssessmentWithQueryObjectSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private assessmentService: AssessmentService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy () {
    (this.getAssessmentSubscription) ? this.getAssessmentSubscription.unsubscribe() : null;
    (this.createAssessmentSubscription) ? this.createAssessmentSubscription.unsubscribe() : null;
    (this.getFilteredAssessmentByProgramSubscription) ? this.getFilteredAssessmentByProgramSubscription.unsubscribe() : null;
    (this.getAllAssessmentSubscription) ? this.getAllAssessmentSubscription.unsubscribe() : null;
    (this.getOneAssessmentSubscription) ? this.getOneAssessmentSubscription.unsubscribe() : null;
    (this.updateAssessmentSubscription) ? this.updateAssessmentSubscription.unsubscribe() : null;
    (this.deleteAssessmentSubscription) ? this.deleteAssessmentSubscription.unsubscribe() : null;
    (this.getAssessmentWithQueryObjectSubscription) ? this.getAssessmentWithQueryObjectSubscription.unsubscribe() : null;
  }

  GetAssessment (programId: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_GET_ATTEMPT });
    this.getAssessmentSubscription = this.assessmentService.GetAssessment(programId)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToViewFlat(d))
      return newData;
    })
    .map(data => this.sortBySopiCode(data))
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateAssessment (programId: number, assessment: IAssessmentView) {
    this.ngRedux.dispatch({ type: ASSESSMENT_CREATE_ATTEMPT });
    this.createAssessmentSubscription = this.assessmentService.CreateAssessment(programId, assessment)
    .map(data => this.assessmentToViewFlat(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_CREATE_FULFILLED, payload: assessment });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Assessment Creation',
          text: `You successfully Added a new Assessment.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_CREATE_FAILED, error: this.errorMessage });
          
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetFilteredAssessmentByProgram (programId: number, filterName: string, filterValue: string) {
    this.ngRedux.dispatch({ type: ASSESSMENT_GET_ATTEMPT });
    this.getFilteredAssessmentByProgramSubscription = this.assessmentService.GetFilteredAssessmentByProgram(programId, filterName, filterValue)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToViewFlat(d))
      return newData;
    })
    .map(data => this.sortBySopiCode(data))
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetAllAssessment () {
    this.ngRedux.dispatch({ type: ASSESSMENT_GET_ATTEMPT });
    this.getAllAssessmentSubscription = this.assessmentService.GetAllAssessment()
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToViewFlat(d))
      return newData;
    })
    .map(data => this.sortBySopiCode(data))
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetFilteredAssessment (filterName: string, filterValue: string) {
    this.ngRedux.dispatch({ type: ASSESSMENT_GET_ATTEMPT });
    this.getFilteredAssessmentSubscription = this.assessmentService.GetFilteredAssessment(filterName, filterValue)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToViewFlat(d))
      return newData;
    })
    .map(data => this.sortBySopiCode(data))
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneAssessment (id: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_GET_ATTEMPT });
    this.getOneAssessmentSubscription = this.assessmentService.GetOneAssessment(id)
    .map(data => this.assessmentToViewFlat(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        const assessments = [assessment];
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateAssessment (id: number, assessment: IAssessmentView) {
    this.ngRedux.dispatch({ type: ASSESSMENT_UPDATE_ATTEMPT });
    this.updateAssessmentSubscription = this.assessmentService.UpdateAssessment(id, assessment)
    .map(data => this.assessmentToViewFlat(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        this.ngRedux.dispatch({type: ASSESSMENT_UPDATE_FULFILLED, payload: assessment});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Assessment Update',
          text: `Assessment ID: ${assessment.id} was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteAssessment (id: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_DELETE_ATTEMPT });
    this.deleteAssessmentSubscription = this.assessmentService.DeleteAssessment(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Assessment Deletion',
          text: `Assessment ID: ${id} was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  SelectAssessment (id: number) {
    this.ngRedux.dispatch({ type: ASSESSMENT_SELECT_ATTEMPT });
    this.getOneAssessmentSubscription = this.assessmentService.GetOneAssessment(id)
    .map(data => this.assessmentToView(data))
    .subscribe(
      (assessment: IAssessmentView) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_SELECT_FULFILLED, payload: assessment });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_SELECT_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetAssessmentWithQueryObject (operator: string, queryObjectArray: any[]) {
    this.getAssessmentWithQueryObjectSubscription = this.assessmentService.GetAssessmentWithFilterObject(operator, queryObjectArray)
    .map(data => {
      let newData: IAssessmentView[];
      newData = data.map(d => this.assessmentToViewFlat(d))
      return newData;
    })
    .map(data => this.sortBySopiCode(data))
    .subscribe(
      (assessments: IAssessmentView[]) => {
        this.ngRedux.dispatch({ type: ASSESSMENT_GET_FULFILLED, payload: assessments });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: ASSESSMENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private assessmentToViewFlat: Function = (data: IAssessment): any => {
    let newData: any;
    newData = {
      id: data.id,
      assessmentLevel: data.assessmentLevel,
      assessmentTask: data.assessmentTask,
      target: data.target,
      passingGrade: data.passingGrade,
      performance: data.performance,
      improvementPlan: data.improvementPlan,
      term: data.term,
      academicYear: data.academicYear,
      cycle: data.cycle,
      ProgramId: data.ProgramId,
      ProgramSopiId: data.ProgramSopiId,
      ProgramCourseId: data.ProgramCourseId,
      Program: data['Program.name'],
      Sopi: data['ProgramSopi.Sopi.code'],
      Course: data['ProgramCourse.Course.code']
    };
    return newData;
  };

  private assessmentToView: Function = (data: IAssessment): any => {
    let newData: any;
    newData = {
      id: data.id,
      assessmentLevel: data.assessmentLevel,
      assessmentTask: data.assessmentTask,
      target: data.target,
      passingGrade: data.passingGrade,
      performance: data.performance,
      improvementPlan: data.improvementPlan,
      term: data.term,
      academicYear: data.academicYear,
      cycle: data.cycle,
      ProgramId: data.ProgramId,
      ProgramSopiId: data.ProgramSopiId,
      ProgramCourseId: data.ProgramCourseId,
      Program: data.Program.name,
      Sopi: data.ProgramSopi.Sopi.code,
      Course: data.ProgramCourse.Course.code
    };
    return newData;
  }

  private sortBySopiCode: Function = (data: IAssessmentView[]): IAssessmentView[] => {
    const sortedSopi = _.sortBy(data, (d) => {
      return d.sopi;
    });
    return sortedSopi;
  };
}
