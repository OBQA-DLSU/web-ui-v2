import { Routes } from '@angular/router';
import { SopiListComponent } from './sopi-list/sopi-list.component';
import { AddSopiComponent } from './add-sopi/add-sopi.component';

export const SopiRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SopiListComponent
      }, {
        path: 'add-sopi',
        component: AddSopiComponent
      }
    ]
  }
];
