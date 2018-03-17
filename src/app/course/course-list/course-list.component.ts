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

import { EditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

declare var $: any;

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit, OnDestroy {

  @select(s => s.courses.Courses) Courses;
  @select(s => s.session.ProgramId) ProgramId;
  @select(s => s.session.isAdmin) isAdmin;
  @select(s => s.courses.spinner) spinner;
  @select(s => s.table.page) page;

  public filterBy: string;
  public filterValue: any;

  constructor(
    private courseActionCreator: CourseActionCreator,
    private miscActionCreator: MiscActionCreator,
    private tableActionCreator: TableActionCreator,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  private dataNames = ['id', 'code', 'name', 'description', 'toBeAssessed'];
  private dataNameAlias = ['ID', 'Code', 'Name', 'Description', 'To Be Assessed?'];
  private dialogRef: any;
  private dialogRefSubscription: Subscription = null;
  private programIdSubscription: Subscription = null;

  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Course List');
    this.programIdSubscription = this.ProgramId.subscribe(
      programId => {this.courseActionCreator.GetCourse(programId); console.log(programId);},
      err => null
    );
  }

  ngOnDestroy() {
    (this.dialogRefSubscription) ? this.dialogRefSubscription.unsubscribe() : null;
    (this.programIdSubscription) ? this.programIdSubscription.unsubscribe() : null;
    this.tableActionCreator.ResetPage();
  }

  onClickEdit(data) {
    this.dialogRef = this.dialog.open(EditCourseDialog, {
      width: '500px',
      data: { ...data }
    });

    this.dialogRefSubscription = this.dialogRef.afterClosed().subscribe(result => {
      if (!result) {
      } else {
        const newData = JSON.parse(result);
        this.courseActionCreator.UpdateCourse(newData.ProgramCourseId, newData);
      }
    });
  }

  onClickCheck(data) {
    this.courseActionCreator.UpdateToBeAssessed(data.id, true, true);
  }

  onClickX(data) {
    this.courseActionCreator.UpdateToBeAssessed(data.id, false, true);
  }

  async onClickDelete(data) {
    let x = await swal({
      title: 'Are you sure?',
      text: `You are about to delete ${data.code} in the list of Courses.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (response) {
      if (response) { return true; }
    }, function (dismiss) {
      // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      if (dismiss === 'cancel') {
        swal({
          title: 'Cancelled',
          text: 'The course has not been deleted.',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        });
      }
    }).catch(swal.noop);
    if (x) {
      this.courseActionCreator.DeleteCourse(data.id, data);
    }
  }

  toggleFilter() {
    this.filterBy = 'toBeAssessed';
    if (this.filterValue) {
      this.filterValue = false;
      this.tableActionCreator.ResetPage();
    } else {
      this.filterValue = true;
      this.tableActionCreator.ResetPage();
    }
  }

  showAll() {
    this.filterBy = null;
    this.tableActionCreator.ResetPage();
  }
}
