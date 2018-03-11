import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { 
  EvidenceService,
  DialogService
} from '../../services';

import { IAppState } from '../app.store';
import { IEvidence } from '../../interfaces/evidence/evidence.interface';
import { IEvidenceView } from '../../interfaces/evidence/evidence-view.interface';
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
} from '../action/evidence.actions';

@Injectable()

export class EvidenceActionCreator implements OnDestroy {

  private getListOfEvidencePerProgramSubscription: Subscription = null;
  private getMyClassEvidenceMetaDataSubscription: Subscription = null;
  private getEvidenceWithQueryObjectSubscription: Subscription = null;
  private errorMessage: string = null;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private evidenceService: EvidenceService,
    private dialogService: DialogService
  ) {}

  ngOnDestroy() {
    (this.getListOfEvidencePerProgramSubscription) ? this.getListOfEvidencePerProgramSubscription.unsubscribe() : null;
    (this.getMyClassEvidenceMetaDataSubscription) ? this.getMyClassEvidenceMetaDataSubscription.unsubscribe() : null;
    (this.getEvidenceWithQueryObjectSubscription) ? this.getEvidenceWithQueryObjectSubscription.unsubscribe() : null;
  }

  GetListOfEvidencePerProgram (programId: number) {
    this.getListOfEvidencePerProgramSubscription = this.evidenceService.GetListOfEvidencePerProgram(programId)
    .map(data => {
      let newData: IEvidenceView[];
      newData = data.map(d => this.evidenceToViewFlat(d))
      return newData;
    })
    .subscribe(
      (grades: IEvidenceView[]) => {
        this.ngRedux.dispatch({type: EVIDENCE_GET_FULFILLED, payload: grades});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: EVIDENCE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetMyClassEvidenceMetaData (myClassId: number) {
    this.getMyClassEvidenceMetaDataSubscription = this.evidenceService.GetMyClassEvidenceMetatData(myClassId)
    .map(data => {
      let newData: IEvidenceView[];
      newData = data.map(d => this.evidenceToViewFlat(d))
      return newData;
    })
    .subscribe(
      (grades: IEvidenceView[]) => {
        this.ngRedux.dispatch({type: EVIDENCE_GET_FULFILLED, payload: grades});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: EVIDENCE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetEvidenceWithQueryObject (operator: string, queryObjectArray: any[]) {
    this.getEvidenceWithQueryObjectSubscription = this.evidenceService.GetEvidenceWithQueryObject(operator, queryObjectArray)
    .map(data => {
      let newData: IEvidenceView[];
      newData = data.map(d => this.evidenceToViewFlat(d))
      return newData;
    })
    .subscribe(
      (grades: IEvidenceView[]) => {
        this.ngRedux.dispatch({type: EVIDENCE_GET_FULFILLED, payload: grades});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: EVIDENCE_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateEvidence (data: IEvidence) {
    const evidence = this.evidenceToView(data);
    this.ngRedux.dispatch({ type: EVIDENCE_CREATE_FULFILLED, payload: evidence });
    this.dialogService.showSwal('success-message', {
      title:  'Successful Evidence Upload',
      text: `Evidence was successfully Added.`
    });
  }

  CreateEvidenceFailed (error: string) {
    this.ngRedux.dispatch({ type: EVIDENCE_CREATE_FAILED, error: error });
    this.dialogService.showSwal('error-message', {
      title: 'Evidence Upload Failed',
      text: `Error: ${error}`
    });
  }

  UpdateEvidence (data: IEvidence) {
    const evidence = this.evidenceToView(data);
    this.ngRedux.dispatch({ type: EVIDENCE_UPDATE_FULFILLED, payload: evidence });
    this.dialogService.showSwal('success-message', {
      title:  'Successful Evidence Update',
      text: `Evidence with ID ${data.id} was successfully Updated.`
    });
  }

  UpdateEvidenceFailed (error: string ) {
    this.ngRedux.dispatch({ type: EVIDENCE_UPDATE_FAILED, error: error });
    this.dialogService.showSwal('error-message', {
      title: 'Evidence Update Failed',
      text: `Error: ${error}`
    });
  }

  // functions
  private evidenceToViewFlat(data: any): IEvidenceView {
    let newData: IEvidenceView;
    newData = {
      id: data.id,
      name: data.name,
      mimeType: data.mimeType,
      type: data.type,
      Program: data['Program.name'],
      ProgramId: data.ProgramId,
      AssessmentId: data.AssessmentId,
      MyClassId: data['MyClass.InstructorId'],
      InstructorId: data.InstructorId,
      ProgramCourseId: data.ProgramCourseId,
      Course: data['ProgramCourse.Course.code'],
      ProgramSopiId: data.ProgramSopiId,
      Sopi: data['ProgramSopi.Sopi.code']
    };
    return newData;
  };

  private evidenceToView (data: IEvidence): IEvidenceView  {
    let newData: IEvidenceView;
    newData = {
      id: data.id,
      name: data.name,
      mimeType: data.mimeType,
      type: data.type,
      Program: data.Program.name,
      ProgramId: data.ProgramId,
      AssessmentId: data.AssessmentId,
      MyClassId: data.MyClassId,
      InstructorId: data.MyClass.InstructorId,
      ProgramCourseId: data.ProgramCourseId,
      Course: data.ProgramCourse.Course.code,
      ProgramSopiId: data.ProgramSopiId,
      Sopi: data.ProgramSopi.Sopi.code
    };
    return newData;
  }
}
