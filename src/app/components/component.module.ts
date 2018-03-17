import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialModule } from '../app.module';

import { ObqaTableComponent } from './table/obqa-table.component';
import { FormComponent } from './form/form.component';
import { ObqaUploadBasicComponent } from './upload/basic/obqa-upload-basic.component';
import { ObqaInputBasicComponent } from './input/basic/obqa-input-basic.component';
import { CardCommentComponent } from './card/card-comment/card-comment.component';
import { ObqaTableSimpleComponent } from './table/obqa-table-simple/obqa-table-simple.component';
import { XlsxToJsonComponent } from './upload/xlsx-json/xlsx-to-json.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpModule
  ],
  exports: [
    ObqaTableComponent,
    FormComponent,
    ObqaUploadBasicComponent,
    ObqaInputBasicComponent,
    CardCommentComponent,
    ObqaTableSimpleComponent,
    XlsxToJsonComponent
  ],
  declarations: [
    ObqaTableComponent,
    FormComponent,
    ObqaUploadBasicComponent,
    ObqaInputBasicComponent,
    CardCommentComponent,
    ObqaTableSimpleComponent,
    XlsxToJsonComponent
  ],
  entryComponents: []
})
export class ComponentModule {
}
