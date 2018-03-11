import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IMyClass } from '../interfaces/myClass/my-class.interface';
import { IMyClassView } from '../interfaces/myClass/my-class-view.interface';

import { BACKEND_URL } from '../config';

@Injectable()
export class MyClassService {

  constructor(
    private http: Http
  ) { }

  private myClassUrl: string = `${BACKEND_URL}/api/myClass/`;

  GetOneMyClass (id: number): Observable<IMyClass> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/programMyClass/${id}`, options)
    .map(response => response.json())
  }

  UpdateMyClass (id: number, myClass: IMyClassView): Observable<IMyClass> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.myClassUrl}/programMyClass/${id}`, myClass, options)
    .map(response => response.json())
  }

  DeleteMyClass (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.myClassUrl}/programMyClass/${id}`, options)
    .map(response => response.json())
  }

  GetMyClassPerProgramWithFilter (programId: number, filterName: string, filterValue: string): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/filteredByProgramId/${programId}/${filterName}/${filterValue}`, options)
    .map(response => response.json())
  }

  GetMyClassWithFilter (filterName: string, filterValue: string): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/${filterName}/${filterValue}`, options)
    .map(response => response.json())
  }

  GetMyClassAll (): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/all`, options)
    .map(response => response.json())
  }

  GetMyClass (programId: number): Observable<IMyClass[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.myClassUrl}/${programId}`, options)
    .map(response => response.json())
  }

  CreateMyClass (programId: number, myClass: IMyClassView): Observable<IMyClass> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.myClassUrl}/${programId}`, myClass, options)
    .map(response => response.json())
  }

}
