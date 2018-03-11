import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { CoordinatorLayoutComponent } from './layouts/coordinator/coordinator-layout.component';
import { InstructorLayoutComponent } from './layouts/instructor/instructor-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    }, 
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
        {
          path: 'admin',
          loadChildren: './pages/admin-page/admin-page.module#AdminPageModule'
        }
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        {
          path: 'auth',
          loadChildren: './pages/auth-page/auth-page.module#AuthPageModule'
        }
      ]
    },
    {
      path: '',
      component: CoordinatorLayoutComponent,
      children: [
        {
          path: 'coordinator',
          loadChildren: './pages/coordinator-page/coordinator-page.module#CoordinatorPageModule'
        }
      ]
    },
    {
      path: '',
      component: InstructorLayoutComponent,
      children: [
        {
          path: 'instructor',
          loadChildren: './pages/instructor-page/instructor-page.module#InstructorPageModule'
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'auth',
      pathMatch: 'full'
    }
];
