import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAssessmentDiscussion } from '../interfaces/assessment/assessment-discussion.interface';
import { BACKEND_URL } from '../config';
import "rxjs/add/operator/map";

@Injectable()
export class AssessmentDiscussionService {

  constructor(
    private http: Http
  ) { }

  private assessmentDiscussionUrl: string = `${BACKEND_URL}/api/assessmentDiscussion`;

  GetAssessmentDiscussion (assessmentId: number): Observable<IAssessmentDiscussion[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentDiscussionUrl}/assessment/${assessmentId}`, options)
    .map(response => response.json())
  }

  CreateAssessmentDiscussion (assessmentId: number, assessmentDiscussion: IAssessmentDiscussion): Observable<IAssessmentDiscussion> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(`${this.assessmentDiscussionUrl}/assessment/${assessmentId}`, assessmentDiscussion, options)
    .map(response => response.json())
  }

  GetOneAssessmentDiscussion (id: number): Observable<IAssessmentDiscussion> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.assessmentDiscussionUrl}/${id}`, options)
    .map(response => response.json())
  }

  UpdateAssessmentDiscussion (id: number, assessmentDiscussion: IAssessmentDiscussion): Observable<IAssessmentDiscussion[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(`${this.assessmentDiscussionUrl}/${id}`, assessmentDiscussion, options)
    .map(response => response.json())
  }

  DeleteAssessmentDiscussion (id: number): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.assessmentDiscussionUrl}/${id}`, options)
    .map(response => response.json())
  }
}
