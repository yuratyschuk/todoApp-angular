import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  private subject = new BehaviorSubject<any>(undefined);

  constructor() { }

  sendClickEvent(projectId: number) { 
    this.subject.next(projectId);
  }

  getClickEvent(): BehaviorSubject<any>{ 
    return this.subject;

  }
}
