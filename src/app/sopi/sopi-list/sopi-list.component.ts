import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import {
  MiscActionCreator,
  SopiActionCreator,
  TableActionCreator
} from '../../store/action-creators';
import { ISopiView } from '../../interfaces/sopi/sopi-view.interface';
import { select } from '@angular-redux/store';
import { ISession } from '../../interfaces/session/session.interface';

import { EditSopiDialog } from '../edit-sopi-dialog/edit-sopi-dialog.component';

declare var $: any;

@Component({
  selector: 'app-sopi-list',
  templateUrl: './sopi-list.component.html'
})
export class SopiListComponent implements OnInit, OnDestroy {

  constructor (
    private sopiActionCreator: SopiActionCreator,
    private miscActionCreator: MiscActionCreator,
    private tableActionCreator: TableActionCreator,
    public dialog: MatDialog
  ) { }

  @select(s => s.sopis.Sopis) Sopis$;
  @select(s => s.table.page) page;
  @select(s => s.sopis.spinner) spinner;
  private dataNames = ['id', 'code', 'So', 'description'];
  private dataNameAlias = ['ID', 'SOPI Code', 'SO', 'Description'];
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private session: ISession = JSON.parse(localStorage.getItem('session'));
  private ProgramId: number = this.session.ProgramId;

  ngOnInit () {
    this.miscActionCreator.UpdatePageTitle('SOPI list');
    this.sopiActionCreator.GetSopi(this.ProgramId);
    
  }

  ngOnDestroy () {
    (this.dialogRefSubscription) ? this.dialogRefSubscription.unsubscribe() : null;
    this.tableActionCreator.ResetPage();
  }

  onClickEdit(data) {
    this.dialogRef = this.dialog.open(EditSopiDialog, {
      width: '500px',
      data: { ...data }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.sopiActionCreator.UpdateSopi(newData.id, newData);
      }
    });
  }

  async onClickDelete(data) {
    let x = await swal({
      title: 'Are you sure?',
      text: `You are about to delete ${data.code} in the list of SOPIs.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (data) {
      if (data.value) { return true; }
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: 'The SOPI has not been deleted.',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        });
      }
    }).catch(swal.noop);
    if (x) {
      this.sopiActionCreator.DeleteSopi(data.id, data);
    }
  }

}
