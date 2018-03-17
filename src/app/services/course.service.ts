import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICourseView } from '../interfaces/course/course-view.interface';
import { IProgramCourse } from '../interfaces/programCourse/program-course.interface';
import { BACKEND_URL } from '../config';
import "rxjs/add/operator/map";

@Injectable()
export class CourseService {

  constructor(private http:Http) { }
  
  private courseUrl: string = `${BACKEND_URL}/api/course/`;

  GetCourse (ProgramId: number, flat: boolean = true): Observable<IProgramCourse[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.courseUrl+`${ProgramId}?flat=${flat}`,options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  CreateCourse (ProgramId:number, Course: ICourseView, flat: boolean = true): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.courseUrl+`${ProgramId}?flat=${flat}`, Course, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  UpdateCourse (id: number, Course: ICourseView, flat: boolean = true): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(this.courseUrl+`programCourse/${id}?flat=${flat}`, Course, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  UpdateToBeAssessed (id: number, toBeAssessed: boolean, flat: boolean = true): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.patch(this.courseUrl+`programCourse/${id}?flat=${flat}`, {toBeAssessed}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  DeleteCourse (id: number): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.courseUrl}programCourse/${id}`, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  CreateBulkCourse (ProgramId: number, dataArray: ICourseView[], flat: boolean = true): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.courseUrl+`bulk/${ProgramId}?flat=${flat}`, {dataArray}, options)
    .map(response => response.json())
    .map(data => this.GetData(data))
  }

  GetData (data) {
    return data.data;
  }

}
