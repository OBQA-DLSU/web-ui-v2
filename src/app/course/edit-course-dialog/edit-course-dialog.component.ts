



import { Component, OnInit, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import {
  CourseActionCreator,
  MiscActionCreator,
  TableActionCreator
} from '../../store/action-creators';

declare var $: any;

@Component({
  selector: 'dialog-course-form',
  templateUrl: './dialog-course-form.html',
})
export class EditCourseDialog implements OnInit, OnDestroy {

  public courseEditForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.courseEditForm = this.formBuilder.group({
      ProgramCourseId: [this.data.id, Validators.required],
      code: [this.data.code, Validators.required],
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      toBeAssessed: [this.data.toBeAssessed, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.courseEditForm.valid) {
      this.dialogRef.close(`${JSON.stringify(this.courseEditForm.value)}`);
    } else {
      alert('Please complete the form');
      this.dialogRef.close();
    }
  }

}
