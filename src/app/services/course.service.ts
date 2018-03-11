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

  GetCourse (programId: number): Observable<IProgramCourse[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.courseUrl+`${programId}`,options)
    .map(response => response.json())
  }

  CreateCourse (programId:number, course: ICourseView): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.courseUrl+`${programId}/${course.toBeAssessed}`, course, options)
    .map(response => response.json())
  }

  UpdateCourse (id: number, course: ICourseView): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.put(this.courseUrl+`programCourse/${id}`, course, options)
    .map(response => response.json())
  }

  DeleteCourse (id: number): Observable<IProgramCourse> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(`${this.courseUrl}programCourse/${id}`, options)
    .map(response => response.json())
  }

}
