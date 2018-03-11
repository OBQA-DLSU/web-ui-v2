import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { MyClassService } from '../../services/my-class.service';
import { DialogService } from '../../services/dialog.service';
import { IAppState } from '../app.store';
import { IMyClass} from '../../interfaces/myClass/my-class.interface';
import { IMyClassView } from '../../interfaces/myClass/my-class-view.interface';
import {
  MY_CLASS_CREATE_ATTEMPT,
  MY_CLASS_CREATE_FAILED,
  MY_CLASS_CREATE_FULFILLED,
  MY_CLASS_DELETE_ATTEMPT,
  MY_CLASS_DELETE_FAILED,
  MY_CLASS_DELETE_FULFILLED,
  MY_CLASS_GET_ATTEMPT,
  MY_CLASS_GET_FAILED,
  MY_CLASS_GET_FULFILLED,
  MY_CLASS_UPDATE_ATTEMPT,
  MY_CLASS_UPDATE_FAILED,
  MY_CLASS_UPDATE_FULFILLED,
  MY_CLASS_SELECT_ATTEMPT,
  MY_CLASS_SELECT_FAILED,
  MY_CLASS_SELECT_FULFILLED
} from '../action/my-class.actions';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class MyClassActionCreator implements OnDestroy {

  private getMyClassPerProgramWithFilterSubscription: Subscription = null;
  private getMyClassWithFilterSubscription: Subscription = null;
  private getMyClassAllSubscription: Subscription = null;
  private createMyClassSubscription: Subscription = null;
  private updateMyClassSubscription: Subscription = null;
  private deleteMyClassSubscription: Subscription = null;
  private getOneMyClassSubscription: Subscription = null;
  private getMyClassSubscription: Subscription = null;

  private errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private myClassService: MyClassService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy () {
    (this.getMyClassPerProgramWithFilterSubscription) ? this.getMyClassPerProgramWithFilterSubscription.unsubscribe() : null;
    (this.getMyClassWithFilterSubscription) ? this.getMyClassWithFilterSubscription.unsubscribe() : null;
    (this.getMyClassAllSubscription) ? this.getMyClassAllSubscription.unsubscribe() : null;
    (this.createMyClassSubscription) ? this.createMyClassSubscription.unsubscribe() : null;
    (this.updateMyClassSubscription) ? this.updateMyClassSubscription.unsubscribe() : null;
    (this.deleteMyClassSubscription) ? this.deleteMyClassSubscription.unsubscribe() : null;
    (this.getOneMyClassSubscription) ? this.getOneMyClassSubscription.unsubscribe() : null;
    (this.getMyClassSubscription) ? this.getMyClassSubscription.unsubscribe() : null;
  }

  GetOneMyClass(id: number) {
    this.ngRedux.dispatch({ type: MY_CLASS_GET_ATTEMPT });
    this.getOneMyClassSubscription = this.myClassService.GetOneMyClass(id)
    .map(data => this.myClassToView(data))
    .subscribe(
      (myClass: IMyClassView) => {
        this.ngRedux.dispatch({type: MY_CLASS_SELECT_FULFILLED, payload: myClass});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_SELECT_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateMyClass(id: number, myClass: IMyClassView) {
    this.ngRedux.dispatch({ type: MY_CLASS_UPDATE_ATTEMPT });
    this.updateMyClassSubscription = this.myClassService.UpdateMyClass(id, myClass)
    .map(data => this.myClassToView(data))
    .subscribe(
      (myClass: IMyClassView) => {
        this.ngRedux.dispatch({ type: MY_CLASS_UPDATE_FULFILLED, payload: myClass });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Class Update',
          text: `Class ID: ${myClass.id} was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteMyClass(id: number, myClass: IMyClassView) {
    this.ngRedux.dispatch({ type: MY_CLASS_DELETE_ATTEMPT });
    this.deleteMyClassSubscription = this.myClassService.DeleteMyClass(id)
    .subscribe(
      (id) => {
        this.ngRedux.dispatch({ type: MY_CLASS_DELETE_FULFILLED, payload: id });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Class Deletion',
          text: `Class ID: ${myClass.id} was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_DELETE_FAILED, error: this.errorMessage });
          
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetMyClass (id: number) {
    this.ngRedux.dispatch({ type: MY_CLASS_GET_ATTEMPT });
    this.getMyClassSubscription = this.myClassService.GetMyClass(id)
    .map(data => {
      let newData: IMyClassView[];
      newData = data.map(d => this.myClassToView(d))
      return newData;
    })
    .subscribe(
      (myClasses: IMyClassView[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, payload: myClasses});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_GET_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetMyClassPerProgramWithFilter(programId: number, filterName: string, filterValue: string) {
    this.ngRedux.dispatch({ type: MY_CLASS_GET_ATTEMPT });
    this.getMyClassPerProgramWithFilterSubscription = this.myClassService.GetMyClassPerProgramWithFilter(programId, filterName, filterValue)
    .map(data => {
      let newData: IMyClassView[];
      newData = data.map(d => this.myClassToView(d))
      return newData;
    })
    .subscribe(
      (myClasses: IMyClassView[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, payload: myClasses});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_GET_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetMyClassWithFilter(filterName: string, filterValue: string) {
    this.ngRedux.dispatch({ type: MY_CLASS_GET_ATTEMPT });
    this.getMyClassWithFilterSubscription = this.myClassService.GetMyClassWithFilter(filterName, filterValue)
    .map(data => {
      let newData: IMyClassView[];
      newData = data.map(d => this.myClassToView(d))
      return newData;
    })
    .subscribe(
      (myClasses: IMyClassView[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, payload: myClasses});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_GET_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetMyClassAll() {
    this.ngRedux.dispatch({ type: MY_CLASS_GET_ATTEMPT });
    this.getMyClassAllSubscription = this.myClassService.GetMyClassAll()
    .map(data => {
      let newData: IMyClassView[];
      newData = data.map(d => this.myClassToView(d))
      return newData;
    })
    .subscribe(
      (myClasses: IMyClassView[]) => {
        this.ngRedux.dispatch({type: MY_CLASS_GET_FULFILLED, payload: myClasses});
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_GET_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  CreateMyClass(programId: number, myClass: IMyClassView) {
    this.ngRedux.dispatch({ type: MY_CLASS_CREATE_ATTEMPT });
    this.createMyClassSubscription = this.myClassService.CreateMyClass(programId, myClass)
    .subscribe(
      (myClass: IMyClass) => {
        this.ngRedux.dispatch({ type: MY_CLASS_CREATE_FULFILLED, payload: myClass });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Class Add',
          text: `Class ID: ${myClass.id} was successfully added.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: MY_CLASS_CREATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private myClassToView: Function = (data: IMyClass): IMyClassView => {
    let newData: IMyClassView;
    newData = {
      id: data.id,
      InstructorId: data.InstructorId,
      Instructor: {
        id: data.Instructor.id,
        ProgramId: data.Instructor.ProgramId,
        UserId: data.Instructor.ProgramId,
        isAdmin: data.Instructor.isAdmin,
        idNumber: data.Instructor.User.idNumber,
        email: data.Instructor.User.email,
        lname: data.Instructor.User.lname,
        fname: data.Instructor.User.fname
      },
      ProgramId: data.ProgramId,
      Program: data.Program.name,
      ProgramCourseId: data.ProgramCourseId,
      Course: data.ProgramCourse.Course.code,
      term: data.term,
      academicYear: data.academicYear,
      cycle: data.cycle,
      Students: data.MyClassStudents,
      Assessments: data.MyClassAssessments
    };
    return newData;
  };

}
