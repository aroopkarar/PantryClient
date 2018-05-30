import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PageManagerService {

  private pageSubject= new BehaviorSubject<string>('home');
  constructor() { }

  changePage(pageName: string)
  {
    this.pageSubject.next(pageName);
  }

  getCurrentPage()
  {
    return this.pageSubject;
  }

}
