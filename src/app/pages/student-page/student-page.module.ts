import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentPageRoutes } from './student-page.routing';
import { DashboardModule } from '../../dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentPageRoutes),
    FormsModule,
    ReactiveFormsModule,
    DashboardModule
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})

export class StudentPageModule {}
