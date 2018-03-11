import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RolePageComponent } from './role-page/role-page.component';

export const AuthPageRoutes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'role',
        component: RolePageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'signin',
    pathMatch: 'full'
  }
];
