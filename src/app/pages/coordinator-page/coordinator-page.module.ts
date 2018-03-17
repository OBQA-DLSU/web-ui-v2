import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoordinatorPageRoutes } from './coordinator-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { CourseModule, EditCourseDialog } from '../../course';
import { SopiModule, EditSopiDialog } from '../../sopi';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CoordinatorPageRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    CourseModule,
    SopiModule
  ],
  declarations: [
  ],
  entryComponents: [
    EditCourseDialog,
    EditSopiDialog
  ]
})

export class CoordinatorPageModule {}
