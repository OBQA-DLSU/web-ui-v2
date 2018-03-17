import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import {
  SopiActionCreator,
  MiscActionCreator
} from '../../store/action-creators';
import { ISession } from '../../interfaces/session/session.interface';

declare var $: any;

@Component({
  selector: 'app-add-sopi',
  templateUrl: './add-sopi.component.html'
})
export class AddSopiComponent implements OnInit, OnDestroy {


  private session: ISession = JSON.parse(localStorage.getItem('session'));
  private ProgramId: number = this.session.ProgramId;
  private sopiForm: FormGroup;
  
  @select(s => s.sopis.spinner) spinner;
  constructor(
    private formBuilder: FormBuilder,
    private sopiActionCreator: SopiActionCreator,
    private miscActionCreator: MiscActionCreator
  ) { }

  ngOnInit() {
    this.miscActionCreator.UpdatePageTitle('Add SOPI');
    this.sopiForm = this.formBuilder.group({
      code: [null, Validators.required],
      So: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  ngOnDestroy() {

  }

  onSubmit (event) {
    if (this.sopiForm.valid) {
      this.sopiActionCreator.CreateSopi(this.ProgramId, this.sopiForm.value);
    }
  }

  uploadXLXS (data) {
    console.log(data);
    this.sopiActionCreator.SopiBulkCreate(this.ProgramId, data, true);
    this.ngOnInit();
  }

}
