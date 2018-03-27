import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/Rx";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {

  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */

  constructor(
    private _http: Http
  ) {}

  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

  login(info){
    return this._http.post('/api/login', info)
    .map(data => data.json())
    .toPromise()
  }

  setLoggedIn(){
    localStorage.setItem('token', 'JWT');
    this.loggedIn.next(true);
  }

  logOut(){
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
