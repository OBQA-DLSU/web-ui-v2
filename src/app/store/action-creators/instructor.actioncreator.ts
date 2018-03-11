import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { InstructorService } from '../../services/instructor.service';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../app.store';
import { IInstructorView } from '../../interfaces/instructor/instructor-view.interface';
import { IInstructor } from '../../interfaces/instructor/instructor.interface';
import {
  INSTRUCTOR_CREATE_ATTEMPT,
  INSTRUCTOR_CREATE_FAILED,
  INSTRUCTOR_CREATE_FULFILLED,
  INSTRUCTOR_GET_ATTEMPT,
  INSTRUCTOR_GET_FAILED,
  INSTRUCTOR_GET_FULFILLED,
  INSTRUCTOR_UPDATE_ATTEMPT,
  INSTRUCTOR_UPDATE_FAILED,
  INSTRUCTOR_UPDATE_FULFILLED,
  INSTRUCTOR_DELETE_ATTEMPT,
  INSTRUCTOR_DELETE_FAILED,
  INSTRUCTOR_DELETE_FULFILLED
} from '../action/instructor.actions';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class InstructorActionCreator implements OnDestroy {

  private errorMessage: string = null;
  private getAllInstructorSubscription: Subscription = null;
  private getInstructorSubscription: Subscription = null;
  private createInstructorSubscription: Subscription = null;
  private getOneInstructorSubscription: Subscription = null;
  private updateInstructorSubscription: Subscription = null;
  private deleteInstructorSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private instructorService: InstructorService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy () {
    (this.getAllInstructorSubscription) ? this.getAllInstructorSubscription.unsubscribe() : null;
    (this.getInstructorSubscription) ? this.getInstructorSubscription.unsubscribe() : null;
    (this.createInstructorSubscription) ? this.createInstructorSubscription.unsubscribe() : null;
    (this.getOneInstructorSubscription) ? this.getOneInstructorSubscription.unsubscribe() : null;
    (this.updateInstructorSubscription) ? this.updateInstructorSubscription.unsubscribe() : null;
    (this.deleteInstructorSubscription) ? this.deleteInstructorSubscription.unsubscribe() : null;
  }

  GetAllInstructor () {
    this.ngRedux.dispatch({ type: INSTRUCTOR_GET_ATTEMPT });
    this.getAllInstructorSubscription = this.instructorService.GetAllInstructor()
    .map(data => {
      let newData: IInstructorView[];
      newData = data.map(d => this.instructorToView(d))
      return newData;
    })
    .subscribe(
      (instructors: IInstructorView[]) => {
        this.ngRedux.dispatch({type: INSTRUCTOR_GET_FULFILLED, payload: instructors});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: INSTRUCTOR_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }
  
  GetInstructor (programId: number) {
    this.ngRedux.dispatch({ type: INSTRUCTOR_GET_ATTEMPT });
    this.getInstructorSubscription = this.instructorService.GetInstructor(programId)
    .map(data => {
      let newData: IInstructorView[];
      newData = data.map(d => this.instructorToView(d))
      return newData;
    })
    .subscribe(
      (instructors: IInstructorView[]) => {
        this.ngRedux.dispatch({type: INSTRUCTOR_GET_FULFILLED, payload: instructors});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: INSTRUCTOR_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateInstructor (programId: number, instructor: IInstructorView) {
    this.ngRedux.dispatch({ type: INSTRUCTOR_CREATE_ATTEMPT });
    this.createInstructorSubscription = this.instructorService.CreateInstructor(programId, instructor)
    .map(data => this.instructorToView(data))
    .subscribe(
      (instructor: IInstructorView) => {
        this.ngRedux.dispatch({type: INSTRUCTOR_CREATE_FULFILLED, payload: instructor });
        this.dialogService.showSwal('success-message', {
          title:  'Successfull',
          text: `${instructor.email} was successfully Added.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: INSTRUCTOR_CREATE_FAILED, error: this.errorMessage });
          
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneInstructor (id: number) {
    this.ngRedux.dispatch({ type: INSTRUCTOR_GET_ATTEMPT });
    this.getOneInstructorSubscription = this.instructorService.GetOneInstructor(id)
    .map(data => this.instructorToView(data))
    .subscribe(
      (instructor: IInstructorView) => {
        const instructors = [instructor];
        this.ngRedux.dispatch({type: INSTRUCTOR_GET_FULFILLED, payload: instructors});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: INSTRUCTOR_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateInstructor (id: number, instructor: IInstructorView) {
    this.ngRedux.dispatch({ type: INSTRUCTOR_UPDATE_ATTEMPT });
    this.updateInstructorSubscription = this.instructorService.UpdateInstructor(id, instructor)
    .map(data => this.instructorToView(data))
    .subscribe(
      (instructor: IInstructorView) => {
        this.ngRedux.dispatch({type: INSTRUCTOR_UPDATE_FULFILLED, payload: instructor});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Instructor Update',
          text: `${instructor.email} was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: INSTRUCTOR_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteInstructor (id: number, instructor: IInstructorView) {
    this.ngRedux.dispatch({ type: INSTRUCTOR_DELETE_ATTEMPT });
    this.deleteInstructorSubscription = this.instructorService.DeleteInstructor(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: INSTRUCTOR_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful',
          text: `${instructor.email} was successfully removed.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: INSTRUCTOR_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }


  // functions
  private instructorToView: Function = (data: IInstructor): IInstructorView => {
    let newData: IInstructorView;
    newData = {
      id: data.id,
      ProgramId: data.ProgramId,
      UserId: data.UserId,
      isAdmin: data.isAdmin,
      ProgramName: data.Program.name,
      idNumber: data.User.idNumber,
      email: data.User.email,
      lname: data.User.lname,
      fname: data.User.fname
    };
    return newData;
  };

}