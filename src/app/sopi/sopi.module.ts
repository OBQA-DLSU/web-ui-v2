import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { SopiRoutes } from './sopi.routing';
import { SopiListComponent, EditSopiDialog } from './sopi-list/sopi-list.component';
import { AddSopiComponent } from './add-sopi/add-sopi.component';
import { ComponentModule } from './../components/component.module';
import { DirectiveModule, SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SopiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule
  ],
  declarations: [
    SopiListComponent,
    AddSopiComponent,
    EditSopiDialog
  ],
  entryComponents: [
    EditSopiDialog,
    SpinnerComponent
  ]

})
export class SopiModule { }
