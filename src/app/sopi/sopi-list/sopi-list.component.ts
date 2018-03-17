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

  @select(s => s.sopis.sopis) sopis;
  @select(s => s.table.page) page;
  @select(s => s.sopis.spinner) spinner;
  private dataNames = ['id', 'code', 'so', 'description'];
  private dataNameAlias = ['ID', 'SOPI Code', 'SO', 'Description'];
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private programId: number = 5;

  ngOnInit () {
    this.miscActionCreator.UpdatePageTitle('SOPI list');
    this.sopiActionCreator.GetSopi(this.programId);
    
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


@Component({
  selector: 'dialog-sopi-form',
  templateUrl: './dialog-sopi-form.html',
})

export class EditSopiDialog implements OnInit, OnDestroy {

  private sopiEditForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSopiDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sopiEditForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      code: [this.data.code, Validators.required],
      so: [this.data.so, Validators.required],
      description: [this.data.description, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form): void {
    if (this.sopiEditForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.sopiEditForm.value)}`);
    } else {
      this.dialogRef.close();
    }
  }

}