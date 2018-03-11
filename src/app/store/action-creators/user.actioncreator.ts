import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { AuthenticationService } from '../../services/authentication.service';
import { DialogService } from '../../services/dialog.service';
import { IUserCreate } from '../../interfaces/user/user-create.interface';
import { ISession } from '../../interfaces/session/session.interface';
import { USER_CREATE_FULFILLED, USER_CREATE_FAILED, TOGGLE_USER_CREATE, USER_CREATE_ATTEMPT } from '../action/user.action';
import { SESSION_CREATE_FULFILLED } from 'app/store/action/session.actions';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class UserActionCreator implements OnDestroy {

  private signup: Subscription = null;

  private errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy() {
    (this.signup) ? this.signup.unsubscribe() : null;    
  }

  CreateUser (user: IUserCreate) {
    this.ngRedux.dispatch({ type: USER_CREATE_ATTEMPT });
    this.signup = this.authenticationService.SignUp(user)
    .subscribe(
      (session: ISession) => {
        this.authenticationService.SessionSave(session);
        this.ngRedux.dispatch({type: USER_CREATE_FULFILLED, payload: session });
        this.ngRedux.dispatch({type: SESSION_CREATE_FULFILLED, payload: session });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: USER_CREATE_FAILED, error: this.errorMessage });
          this.dialogService.showSwal('error-message', {
            title: 'Signup Error!',
            text: this.errorMessage
          });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }
}
