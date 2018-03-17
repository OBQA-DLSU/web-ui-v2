import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { CourseListComponent } from './course-list/course-list.component';
import { EditCourseDialog } from './edit-course-dialog/edit-course-dialog.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ComponentModule } from '../components/component.module';
import { SpinnerComponent, DirectiveModule } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule
  ],
  declarations: [
    CourseListComponent,
    AddCourseComponent,
    EditCourseDialog
  ],
  entryComponents: [
    EditCourseDialog,
    SpinnerComponent
  ]
})
export class CourseModule { }
