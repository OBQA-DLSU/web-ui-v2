import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {
  CourseListComponent,
  AddCourseComponent
} from '../../course';

import {
  SopiListComponent,
  AddSopiComponent
} from '../../sopi';

export const CoordinatorPageRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    }]
  },
  {
    path: '',
    children: [
      {
        path: 'set-up/course-list',
        component: CourseListComponent
      },
      {
        path: 'set-up/add-course',
        component: AddCourseComponent
      },
      {
        path: 'set-up/sopi-list',
        component: SopiListComponent
      },
      {
        path: 'set-up/add-sopi',
        component: AddSopiComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
