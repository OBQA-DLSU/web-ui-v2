import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IMyClassStudent } from '../interfaces/myClass/my-class-student.interface';
import { IStudent } from '../interfaces/student/student.interface';

import { BACKEND_URL } from '../config';
import { IStudentView } from 'app/interfaces/student/student-view.interface';

@Injectable()
export class StudentService {

  constructor(
    private http: Http
  ) { }

  private studentUrl: string = `${BACKEND_URL}/api/student`;

  // student API
  GetAllStudent (): Observable<IStudent[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.studentUrl}/all`, options)
    .map(response => response.json())
  }

  GetStudentByProgram (programId: number): Observable<IStudent[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.studentUrl}/program/${programId}`, options)
    .map(response => response.json())
  }

  GetStudentById (id: number): Observable<IStudent> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.studentUrl}/${id}`, options)
    .map(response => response.json())
  }

  UpdateStudent (student: IStudentView, id: number): Observable<IStudent> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.studentUrl}/${id}`, student, options)
    .map(response => response.json())
  }

  DeleteStudent (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.studentUrl}/${id}`, options)
    .map(response => response.json())
  }

  // myClassStudent API
  GetMyClassStudent (myClassId: number): Observable<IMyClassStudent[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.studentUrl}/myClass/${myClassId}`, options)
    .map(response => response.json())
  }

  CreateMyClassStudent (student: IStudentView, myClassId: number): Observable<IMyClassStudent> {
    // idNumber, fname, lname, programId, email, isAdmin => contents of the student to add
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.studentUrl}/myClass/${myClassId}`, student, options)
    .map(response => response.json())
  }

  GetOneMyClassStudent (id: number): Observable<IMyClassStudent> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.studentUrl}/myClassStudent/${id}`, options)
    .map(response => response.json())
  }

  UpdateMyClassStudent (student: IStudentView, id: number): Observable<IMyClassStudent> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.studentUrl}/myClassStudent/${id}`, student, options)
    .map(response => response.json())
  }

  DeleteMyClassStudent (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.studentUrl}/myClassStudent/${id}`, options)
    .map(response => response.json())
  }
}
