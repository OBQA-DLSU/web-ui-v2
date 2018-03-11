import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as Redux from 'redux';
import { Subscription } from 'rxjs/Subscription';

import { InvitationService } from '../../services/invitation.service';
import { IUserInvite } from '../../interfaces/user/user-invite.interface';
import { IAppState } from '../app.store';
import {
  SEND_INVITES_ATTEMPT,
  SEND_INVITES_FAILED,
  SEND_INVITES_FULFILLED
} from '../action/invite.actions';
import { DialogService } from 'app/services/dialog.service';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class InviteActionCreator implements OnDestroy {

  private errorMessage: string = null;
  private inviteSubscription: Subscription = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private invitationService: InvitationService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy() {
    (this.inviteSubscription) ? this.inviteSubscription.unsubscribe() : null;
  }

  SendGroupInvite(userInvites) {
    this.ngRedux.dispatch({ type: SEND_INVITES_ATTEMPT });
    this.inviteSubscription = this.invitationService.Invite(userInvites)
    .subscribe(
      result => {
        this.ngRedux.dispatch({ type: SEND_INVITES_FULFILLED, payload: result });
        this.dialogService.showSwal('success-message',{
          title: 'Invitation Sent!',
          text: 'Congratulations! Your invitation has successfully sent!'
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SEND_INVITES_FAILED, error: this.errorMessage });
          this.dialogService.showSwal('error-message', {
            title: 'Invitation Error!',
            text: 'Your invitation was not successfully sent.'
          });
        }
      }
    );
  }

}
