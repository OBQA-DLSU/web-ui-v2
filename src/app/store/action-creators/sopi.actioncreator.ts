import { Injectable, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from '../app.store';
import { ISopiView } from '../../interfaces/sopi/sopi-view.interface';
import { IProgramSopi } from './../../interfaces/programSopi/program-sopi.interface';
import { SopiService } from '../../services/sopi.service';
import { DialogService } from '../../services/dialog.service';
import {
  SOPI_CREATE_ATTEMPT,
  SOPI_CREATE_FAILED,
  SOPI_CREATE_FULFILLED,
  SOPI_GET_ATTEMPT,
  SOPI_GET_FAILED,
  SOPI_GET_FULFILLED,
  SOPI_UPDATE_ATTEMPT,
  SOPI_UPDATE_FAILED,
  SOPI_UPDATE_FULFILLED,
  SOPI_DELETE_ATTEMPT,
  SOPI_DELETE_FAILED,
  SOPI_DELETE_FULFILLED,
  SOPI_BULK_CREATE_ATTEMPT,
  SOPI_BULK_CREATE_FAILED,
  SOPI_BULK_CREATE_FULFILLED
} from '../action/sopi.actions';
import { Subscribable } from 'rxjs/Observable';
import { MiscActionCreator } from './misc.actioncreator';

@Injectable()

export class SopiActionCreator implements OnDestroy {

  private createSopiSubscription: Subscription = null;
  private getSopiSubscription: Subscription = null;
  private updateSopiSubscription: Subscription = null;
  private deleteSopiSubscription: Subscription = null;
  private bulkCreateSubscription: Subscription = null;

  private errorMessage: string = null;

  constructor (
    private ngRedux: NgRedux<IAppState>,
    private sopiService: SopiService,
    private dialogService: DialogService,
    private miscActionCreator: MiscActionCreator
  ) {}

  ngOnDestroy () {
    (this.createSopiSubscription) ? this.createSopiSubscription.unsubscribe() : null;
    (this.getSopiSubscription) ? this.getSopiSubscription.unsubscribe() : null;
    (this.updateSopiSubscription) ? this.updateSopiSubscription.unsubscribe() : null;
    (this.deleteSopiSubscription) ? this.deleteSopiSubscription.unsubscribe() : null;
    (this.bulkCreateSubscription) ? this.bulkCreateSubscription.unsubscribe() : null;
  }

  CreateSopi (programId: number, sopi: ISopiView) {
    this.ngRedux.dispatch({ type: SOPI_CREATE_ATTEMPT });
    this.createSopiSubscription = this.sopiService.CreateSopi(programId, sopi)
    .map(data => this.programSopiToView(data))
    .subscribe(
      (sopi: ISopiView) => {
        this.ngRedux.dispatch({ type: SOPI_CREATE_FULFILLED, payload: sopi });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Creation',
          text: `${sopi.code} was successfully Created.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_CREATE_FAILED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  GetSopi (programId: number) {
    this.ngRedux.dispatch({ type: SOPI_GET_ATTEMPT });
    this.getSopiSubscription = this.sopiService.GetSopi(programId)
    .map(data => {
      let newData: ISopiView[];
      newData = data.map(d => this.programSopiToView(d));
      return newData;
    })
    .map(data => this.sortBySopiCode(data))
    .subscribe(
      (sopis: ISopiView[]) => {
        this.ngRedux.dispatch({ type: SOPI_GET_FULFILLED, payload: sopis });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_GET_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  UpdateSopi (id: number, sopi: ISopiView) {
    this.ngRedux.dispatch({ type: SOPI_UPDATE_ATTEMPT });
    this.updateSopiSubscription = this.sopiService.UpdateSopi(id, sopi)
    .map(data => this.programSopiToView(data))
    .subscribe(
      (sopi: ISopiView) => {
        this.ngRedux.dispatch({ type: SOPI_UPDATE_FULFILLED, payload: sopi });
        this.dialogService.showSwal('success-message', {
          title:  'Successful Course Update',
          text: `${sopi.code} was successfully Updated.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_UPDATE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  DeleteSopi (id: number, sopi: ISopiView) {
    this.ngRedux.dispatch({ type: SOPI_DELETE_ATTEMPT });
    this.deleteSopiSubscription = this.sopiService.DeleteSopi(id)
    .subscribe(
      (data) => {
        this.ngRedux.dispatch({ type: SOPI_DELETE_FULFILLED, payload: data });
        this.dialogService.showSwal('success-message', {
          title:  'Successful SOPI Deletion',
          text: `${sopi.code} was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_DELETE_FAILED, error: this.errorMessage });
          // put error mesage here.
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  SopiBulkCreate (ProgramId: number, dataArray: any[], flat: boolean = true) {
    this.ngRedux.dispatch({ type: SOPI_BULK_CREATE_ATTEMPT });
    const newDataArray: ISopiView[] = this.ProcessSopiDataArray(dataArray);
    this.bulkCreateSubscription = this.sopiService.CreateBulkSopi(ProgramId, newDataArray, flat)
    .subscribe(
      (data) => {
        console.log(data);
        this.ngRedux.dispatch({ type: SOPI_BULK_CREATE_FULFILLED });
        this.dialogService.showSwal('success-message', {
          title:  'Successfully uploaded courses'
          // text: `${course.code} was successfully deleted.`
        });
      }, err => {
        this.errorMessage = err._body;
        if (this.errorMessage && typeof this.errorMessage === 'string') {
          this.ngRedux.dispatch({ type: SOPI_BULK_CREATE_FULFILLED, error: this.errorMessage });
        }
      },
      () => {
        this.errorMessage = null;
      }
    );
  }

  // functions
  private programSopiToView: Function = (data: IProgramSopi): ISopiView => {
    let newData: ISopiView;
    newData = {
      id: data.id,
      code: data['Sopi.code'],
      So: data['Sopi.So.code'],
      description: data.description,
      ProgramId: data.ProgramId,
      Program: data['Program.name']
    };
    return newData;
  };

  private sortBySopiCode: Function = (data: ISopiView[]): ISopiView[] => {
    const sortedSopi = _.sortBy(data, (d) => {
      return d.code;
    });
    return sortedSopi;
  };

  private ProcessSopiDataArray (dataArray: any[]): ISopiView[] {
    console.log(dataArray);
    const newData: ISopiView[] = dataArray.map((d) => {
      return {
        code: d['SOPI'],
        So: d['SO'],
        description: d['DESCRIPTION']
      };
    });
    return newData;
  }
}
