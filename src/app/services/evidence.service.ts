import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BACKEND_URL } from '../config';
import { IEvidence } from '../interfaces/evidence/evidence.interface';

@Injectable()
export class EvidenceService {

  constructor(
    private http: Http
  ) { }

  private evidenceUrl = `${BACKEND_URL}/api/evidence`;

  GetListOfEvidencePerProgram(programId: number): Observable<IEvidence[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.evidenceUrl}/program/${programId}`, options)
    .map(response => response.json())
  }

  GetMyClassEvidenceMetatData(myClassId: number): Observable<IEvidence[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.evidenceUrl}/myClass/${myClassId}`, options)
    .map(response => response.json())
  }

  GetEvidenceWithQueryObject(operator: string, queryObjectArray: any[]): Observable<IEvidence[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.evidenceUrl}/query`, {operator, queryObjectArray}, options)
    .map(response => response.json())
  }
}
