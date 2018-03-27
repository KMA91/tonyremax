import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs";

@Injectable()
export class UploadService {

  constructor(
    private _http: Http
  ) { }

  addListing(address){
    return this._http.post('/api/addlisting', address)
    .map(data => data.json())
    .toPromise()
  }

  removeImage(key){
    return this._http.post('/api/removeImage', key)
    .map(data => data.json())
    .toPromise()
  }
}
