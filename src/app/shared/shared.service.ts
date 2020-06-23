import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private categoryIdObserver = new BehaviorSubject<number>(0);
  public categoryIdSubscriber$ = this.categoryIdObserver.asObservable();

  constructor() { }

  emitData(data: any) {
    this.categoryIdObserver.next(data);
  }


}
