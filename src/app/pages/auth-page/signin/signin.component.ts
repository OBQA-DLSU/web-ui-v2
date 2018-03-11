import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store'; 
import { SessionActionCreator } from '../../../store/action-creators';
import { Subscription } from 'rxjs';
import { ISession } from '../../../interfaces/session/session.interface';

declare var $: any;


@Component({
  selector: 'app-sign-in-cmp',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit, OnDestroy {

  test: Date = new Date();
  public toggleButton: any;
  public sidebarVisible: boolean;
  public nativeElement: Node;
  public signInForm: FormGroup;
  private sessionSubscription: Subscription = null;
  @select(s => s.session) session$;
  constructor(
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private sessionActionCreator: SessionActionCreator,
    private router: Router
  ) 
    {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false
  }

  ngOnInit() {
    this.sessionActionCreator.SessionDestroy();
    this.signInForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }
  ngOnDestroy() {
    (this.sessionSubscription) ? this.sessionSubscription.unsubscribe() : null;
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  submit(){
    const pastSession: ISession = JSON.parse(localStorage.getItem('session'));
    if (this.signInForm.valid) {
      this.sessionActionCreator.SessionCreate(this.signInForm.value);
      this.sessionSubscription = this.session$.subscribe(
        (session: ISession) => {
          if (session.token && !session.Program) {
            this.router.navigate(['auth/role']);
          }
        }
      );
    }
  }

  forgotPasswordToggle() {

  }
}
