import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Subscription, Observable } from 'rxjs';
import { ISessionStore } from '../../../store/session.store';
import { IInstructor } from '../../../interfaces/instructor/instructor.interface';
import { IStudent } from '../../../interfaces/student/student.interface';
import { SessionActionCreator } from '../../../store/action-creators';
import { IProgram } from '../../../interfaces/program/program.interface';

declare var $: any;


@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent implements OnInit, DoCheck, OnDestroy {

  test: Date = new Date();
  private sessionSubscription: Subscription;
  public roleSelectForm: FormGroup;
  public isStudent: any[] = [
    { id: 0, value: false, name: 'Instructor' },
    { id: 1, value: true, name: 'Student' }
  ];
  public isStudentSelector: boolean;
  public Instructors: IInstructor[];
  public Students: IStudent[];
  @select(s => s.session) session$: Observable<ISessionStore>;
  @select(s => s.session.User.Instructors) Instructors$;
  constructor(
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator,
    private router: Router
  ) {
    this.isStudentSelector = false;
    this.roleSelectForm = this.formBuilder.group({
      isStudent: [false, Validators.required],
      Program: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.sessionSubscription = this.session$
    .subscribe(
      (session: ISessionStore) => {
        this.Instructors = session.User.Instructors;
        this.Students = session.User.Students;
      }
    );
  }

  ngDoCheck() {
    this.isStudentSelector = this.roleSelectForm.value.isStudent;
  }

  ngOnDestroy() {
    (this.sessionSubscription) ? this.sessionSubscription.unsubscribe() : null;
  }

  onSubmit() {
    console.log(this.roleSelectForm.value);
    this.sessionSubscription = this.session$
    .subscribe(
      (session: ISessionStore) => {
        if (this.roleSelectForm.value.isStudent) {
          const isStudent: boolean = this.roleSelectForm.value.isStudent;
          const Student: IStudent = _.find(session.User.Students, (s) => {
            return s.ProgramId === this.roleSelectForm.value.Program;
          });
          const Program: IProgram = Student.Program;
          const isAdmin: boolean = Student.isAdmin;
          this.sessionActionCreator.SessionUpdateLocalStorage(isStudent, isAdmin, Program.id, Program);
          // this.router.navigate([`student/dashboard`]);
        } else {
          const isStudent: boolean = this.roleSelectForm.value.isStudent;
          const Instructor: IInstructor = _.find(session.User.Instructors, (i) => {
            return i.ProgramId === this.roleSelectForm.value.Program;
          });
          const Program: IProgram = Instructor.Program;
          const isAdmin: boolean = Instructor.isAdmin;
          this.sessionActionCreator.SessionUpdateLocalStorage(isStudent, isAdmin, Program.id, Program);
          // this.router.navigate([`instructor/dashboard`]);
        }
      }, error => {},
      () => {
        
      }
    );
  }

}

// isStudent(pin): null
// isAdmin(pin): null
// ProgramId(pin): null
// InstructorId(pin): null
// Program(pin): null