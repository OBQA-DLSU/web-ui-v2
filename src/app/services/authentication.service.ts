import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { IUserCreate } from '../interfaces/user/user-create.interface';
import { ISessionCreate } from '../interfaces/session/session-create.interface';
import { ISession } from '../interfaces/session/session.interface';
import { IProgram } from '../interfaces/program/program.interface';

import { BACKEND_URL } from '../config';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }
  
  private authUrl: string = `${BACKEND_URL}/api/auth/`;
  private signUpUrl: string = `${BACKEND_URL}/api/auth/signup`;
  private signInUrl: string = `${BACKEND_URL}/api/auth/signin`;

  SignUp(userCreate: IUserCreate): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.signUpUrl, userCreate, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  SignIn(sessionCreate:ISessionCreate): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.signInUrl, sessionCreate, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  SessionSave(session: ISession): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  SessionRead(): ISession {
    return JSON.parse(localStorage.getItem('session'));
  }

  SessionDestroy(): void {
    localStorage.clear();
  }

  SessionUpdate(isStudent: boolean, isAdmin: boolean, ProgramId: number, Program: IProgram): ISession {
    const previousSession: ISession = this.SessionRead();
    const index = _.findIndex(previousSession.User.Instructors, (i) => { return i.ProgramId == ProgramId; });
    let newSession: ISession = {
      User: previousSession.User,
      isStudent,
      isAdmin,
      ProgramId,
      InstructorId: previousSession.User.Instructors[index].id,
      Program: Program,
      token: previousSession.token
    };
    this.SessionSave(newSession);
    return newSession;
  }

  ForgotPassword(email: string) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.authUrl}password`, { email }, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  ChangePassword(email: string, password: string, newPassword: string, confirmation: string): Observable<ISession> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.authUrl}password`, {email, password, newPassword, confirmation}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  GetData (data) {
    return data.data;
  }

}

