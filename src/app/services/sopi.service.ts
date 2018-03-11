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

  GetSopi (programId: number): Observable<IProgramSopi[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.sopiUrl}/${programId}`, options)
    .map(response => response.json())
  }

  CreateSopi (programId: number, sopi: ISopiView): Observable<IProgramSopi> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.sopiUrl}/${programId}`, sopi, options)
    .map(response => response.json())
  }

  UpdateSopi (id: number, sopi: ISopiView): Observable<IProgramSopi> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.sopiUrl}/programSopi/${id}`, sopi, options)
    .map(response => response.json())
  }

  DeleteSopi (id: number): Observable<IProgramSopi> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.sopiUrl}/programSopi/${id}`, options)
    .map(response => response.json())
  }

}
