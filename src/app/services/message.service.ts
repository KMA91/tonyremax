import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs";

@Injectable()
export class MessageService {

  constructor(
    private _http: Http
  ) { }

  sendEmail(form){
    return this._http.post('/api/sendEmail', form)
    .toPromise()
  }

}
