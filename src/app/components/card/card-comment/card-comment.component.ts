import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.css']
})
export class CardCommentComponent implements OnInit, OnDestroy {

  constructor() { }

  public isUser: boolean;
  public idNumberSubscription: Subscription = null;

  @Input() commentId: number;
  @Input() commentContent: string;
  @Input() commentAuthorIdNumber: string;
  @Input() commentAuthor: string;

  @select(s => s.user.user.idNumber) idNumber;

  ngOnInit() {
    this.idNumberSubscription = this.idNumber
    .subscribe(
      idNumber => {
        this.isUser = (idNumber === this.commentAuthorIdNumber) ? true : false;
      }
    );

  }

  ngOnDestroy() {
    (this.idNumberSubscription) ? this.idNumberSubscription.unsubscribe() : null;
  }

}
