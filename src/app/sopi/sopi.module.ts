import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { SopiListComponent } from './sopi-list/sopi-list.component';
import { EditSopiDialog } from './edit-sopi-dialog/edit-sopi-dialog.component';
import { AddSopiComponent } from './add-sopi/add-sopi.component';
import { ComponentModule } from './../components/component.module';
import { DirectiveModule, SpinnerComponent } from '../directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentModule,
    DirectiveModule
  ],
  exports: [
    SopiListComponent,
    AddSopiComponent,
    EditSopiDialog
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
