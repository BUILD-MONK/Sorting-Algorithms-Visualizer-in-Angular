import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();
  private sizeAsSubject = new Subject<any>();

  public isInProgressSubject = new BehaviorSubject<boolean>(false);

  sendClickEvent(sortType:String){
    this.subject.next(sortType);
  }

  sendSizeChangeEvent(size:any)
  {
    this.sizeAsSubject.next(size);
  }

  getClickEvent():Observable<any>{
    return this.subject.asObservable();
  }

  getChangeInSize():Observable<any>{
    return this.sizeAsSubject.asObservable();
  }
}
