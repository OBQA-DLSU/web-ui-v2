import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IUserInvite } from '../interfaces/user/user-invite.interface';
import { BACKEND_URL } from '../config';
import "rxjs/add/operator/map";

@Injectable()
export class InvitationService {

  constructor(private http:Http) { }
  private inviteUrl: string = `${BACKEND_URL}/api/invitation/`;

  Invite (userInvites: IUserInvite[]): Observable<any[]> {
    const headers = new Headers();
    headers.append('Content-type','application/json');
    const options = new RequestOptions({headers});
    return this.http.post(this.inviteUrl, userInvites, options)
    .map(response => response.json())
  }
}
