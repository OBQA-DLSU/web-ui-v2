import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import {
  StudentService,
  DialogService
} from '../../services'
import { IAppState } from '../app.store';
import { IStudent } from '../../interfaces/student/student.interface';
import { IStudentView } from './../../interfaces/student/student-view.interface';
import { IMyClassStudent } from '../../interfaces/myClass/my-class-student.interface';
import { IMyClassStudentView } from './../../interfaces/myClass/my-class-student-view.interface';
import {
  STUDENT_CREATE_ATTEMPT,
  STUDENT_CREATE_FAILED,
  STUDENT_CREATE_FULFILLED,
  STUDENT_DELETE_ATTEMPT,
  STUDENT_DELETE_FAILED,
  STUDENT_DELETE_FULFILLED,
  STUDENT_GET_ATTEMPT,
  STUDENT_GET_FAILED,
  STUDENT_GET_FULFILLED,
  STUDENT_UPDATE_ATTEMPT,
  STUDENT_UPDATE_FAILED,
  STUDENT_UPDATE_FULFILLED
} from '../action/student.action';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class StudentActionCreator implements OnDestroy {

  private createMyClassStudentSubscription: Subscription = null;
  private getMyClassStudentSubscription: Subscription = null;
  private getOneMyClassStudentSubscription: Subscription = null;
  private updateMyClassStudentSubscription: Subscription = null;
  private deleteMyClassStudentSubscription: Subscription = null;

  errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private studentService: StudentService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy() {
    (this.createMyClassStudentSubscription) ? this.createMyClassStudentSubscription.unsubscribe() : null;
    (this.getMyClassStudentSubscription) ? this.getMyClassStudentSubscription.unsubscribe() : null;
    (this.getOneMyClassStudentSubscription) ? this.getOneMyClassStudentSubscription.unsubscribe() : null;
    (this.updateMyClassStudentSubscription) ? this.updateMyClassStudentSubscription.unsubscribe() : null;
    (this.deleteMyClassStudentSubscription) ? this.deleteMyClassStudentSubscription.unsubscribe() : null;
  }

  CreateMyClassStudent (myClassId, student: IStudentView) {
    this.ngRedux.dispatch({ type: STUDENT_CREATE_ATTEMPT });
    this.createMyClassStudentSubscription = this.studentService.CreateMyClassStudent(student, myClassId)
    .map(student => this.myClassStudentToView(student))
    .subscribe(
      (student: IStudentView) => {
        this.ngRedux.dispatch({ type: STUDENT_CREATE_FULFILLED, payload: student });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_CREATE_FAILED, error: this.errorMessage });
        }
      }
    );
  }

  GetMyClassStudent (myClassId: number) {
    this.ngRedux.dispatch({ type: STUDENT_GET_ATTEMPT });
    this.getMyClassStudentSubscription = this.studentService.GetMyClassStudent(myClassId)
    .map(data => {
      let newData: IMyClassStudentView[];
      newData = data.map(d => this.myClassStudentToView(d))
      return newData;
    })
    .subscribe(
      (students: IMyClassStudentView[]) => {
        this.ngRedux.dispatch({type: STUDENT_GET_FULFILLED, payload: students});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetOneMyClassStudent (id: number) {
    this.ngRedux.dispatch({ type: STUDENT_GET_ATTEMPT });
    this.getOneMyClassStudentSubscription = this.studentService.GetOneMyClassStudent(id)
    .map(data => this.myClassStudentToView(data))
    .subscribe(
      (student: IMyClassStudentView) => {
        const students: IMyClassStudentView[] = [student];
        this.ngRedux.dispatch({type: STUDENT_GET_FULFILLED, payload: students});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_GET_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateMyClassStudent (student: IStudentView, id: number) {
    this.ngRedux.dispatch({ type: STUDENT_UPDATE_ATTEMPT });
    this.updateMyClassStudentSubscription = this.studentService.UpdateMyClassStudent(student, id)
    .map(data => this.myClassStudentToView(data))
    .subscribe(
      (student: IMyClassStudentView) => {
        this.ngRedux.dispatch({type: STUDENT_UPDATE_FULFILLED, payload: student});
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Update',
          text: `Student was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteMyClassStudent (id: number) {
    this.ngRedux.dispatch({ type: STUDENT_DELETE_ATTEMPT });
    this.deleteMyClassStudentSubscription = this.studentService.DeleteMyClassStudent(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: STUDENT_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Deletion',
          text: `Student was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: STUDENT_DELETE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }
  // functions
  private myClassStudentToView: Function = (data: IMyClassStudent): IMyClassStudentView => {
    let newData: IMyClassStudentView;
    newData = {
      id: data.id,
      StudentId: data.StudentId,
      MyClassId: data.MyClassId,
      idNumber: data['Student.User.idNumber'],
      email: data['Student.User.email'],
      fname: data['Student.User.fname'],
      lname: data['Student.User.lname'],
      ProgramId: data['Student.ProgramId'],
      Program: data['Student.Program.name']
    };
    return newData;
  };
}
