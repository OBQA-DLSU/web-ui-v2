import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';

export const StudentPageRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    }]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];