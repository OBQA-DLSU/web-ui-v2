import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BACKEND_URL } from '../config';
import { ISopiView } from '../interfaces/sopi/sopi-view.interface';
import { IProgramSopi } from '../interfaces/programSopi/program-sopi.interface';

@Injectable()
export class SopiService {

  constructor(private http:Http) { }

  private sopiUrl: string = `${BACKEND_URL}/api/sopi`;

  GetSopi (ProgramId: number, flat: boolean = true): Observable<IProgramSopi[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.sopiUrl}/program/${ProgramId}?flat=${flat}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  CreateSopi (ProgramId: number, Sopi: ISopiView, flat: boolean = true): Observable<IProgramSopi> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.sopiUrl}/program/${ProgramId}?flat=${flat}`, Sopi, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  UpdateSopi (id: number, Sopi: ISopiView, flat: boolean = true): Observable<IProgramSopi> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.sopiUrl}/programSopi/${id}?flat=${flat}`, Sopi, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  DeleteSopi (id: number): Observable<IProgramSopi> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.sopiUrl}/programSopi/${id}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  CreateBulkSopi (ProgramId: number, dataArray: ISopiView[], flat: boolean = true): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.sopiUrl}/bulk/${ProgramId}?flat=${flat}`, {dataArray}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  GetData (data: any) {
    return data.data;
  }

}
