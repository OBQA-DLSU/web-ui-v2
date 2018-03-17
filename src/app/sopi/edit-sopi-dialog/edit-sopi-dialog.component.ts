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

@Component({
  selector: 'dialog-sopi-form',
  templateUrl: './dialog-sopi-form.html',
})

export class EditSopiDialog implements OnInit, OnDestroy {

  public sopiEditForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSopiDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sopiEditForm = this.formBuilder.group({
      id: [this.data.id, Validators.required],
      code: [this.data.code, Validators.required],
      So: [this.data.So, Validators.required],
      description: [this.data.description, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.sopiEditForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.sopiEditForm.value)}`);
    } else {
      alert('Please complete the form');
      this.dialogRef.close();
    }
  }

}