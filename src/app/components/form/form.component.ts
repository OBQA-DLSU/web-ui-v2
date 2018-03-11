import { Component, OnInit, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @Input() formLabel: String;
  @Input() numberOfInputs: Array<object>; //Number of input
  @Input() inputLabel: Array<string>; //Label of input
  @Input() inputClass: Array<string>; //Classname of input
  @Input() inputType: Array<string>;  //Type of input

  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      '*': [null,  Validators.required]
    });
  }

}
