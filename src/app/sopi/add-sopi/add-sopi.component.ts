import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import {
  SopiActionCreator,
  MiscActionCreator
} from '../../store/action-creators';

declare var $: any;

@Component({
  selector: 'app-add-sopi',
  templateUrl: './add-sopi.component.html'
})
export class AddSopiComponent implements OnInit, OnDestroy {

  
  private userSubscription: Subscription = null;
  private programId: number = 5;
  private sopiForm: FormGroup;
  
  @select(s => s.session.user) user;
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
      so: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.userSubscription = this.user.subscribe(
      result => {
        
      }
    );
  }

  ngOnDestroy() {
    (this.userSubscription)? this.userSubscription.unsubscribe() : null; 
  }

  submit (event) {
    if (this.sopiForm.valid) {
      this.sopiActionCreator.CreateSopi(this.programId, this.sopiForm.value);
    }
  }

}
