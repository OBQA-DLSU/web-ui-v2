import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BACKEND_URL } from '../config';
import { IGradeView } from '../interfaces/grade/grade-view.interface';
import { IGrade } from '../interfaces/grade/grade.interface';


@Injectable()
export class GradeService {

  constructor(
    private http: Http
  ) { }

  private gradeUrl: string = `${BACKEND_URL}/api/grade`;

  GetMyClassGrade (myClassId: number): Observable<IGrade[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.gradeUrl}/myClass/${myClassId}`, options)
    .map(response => response.json())
  }

  UpdateMyClassGrade (myClassId: number, myClassGradeData: any): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.gradeUrl}/myClass/${myClassId}`, myClassGradeData, options)
    .map(response => response.json())
  }

  CreateMyClassGrade (myClassId: number, myClassGradeData: IGradeView[]): Observable<IGrade[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.gradeUrl}/myClass/${myClassId}`, myClassGradeData, options)
    .map(response => response.json())
  }

  GetGradeWithQueryObject (operator: string, queryObjectArray: any[]): Observable<IGrade[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.gradeUrl, {operator, queryObjectArray}, options)
    .map(response => response.json())
  }

  GetOneGrade (id: number): Observable<IGrade> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.gradeUrl}/${id}`, options)
    .map(response => response.json())
  }

  UpdateGrade (id: number, gradeData: IGradeView): Observable<IGrade> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.gradeUrl}/${id}`, gradeData, options)
    .map(response => response.json())
  }

  DeleteGrade (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.gradeUrl}/${id}`, options)
    .map(response => response.json())
  }

  CreateBulkMyClassGrade (myClassId: number, myClassGradeDataArray: any[]): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.gradeUrl}/bulk/${myClassId}`, myClassGradeDataArray, options)
    .map(response => response.json())
  }

}
