import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import 'rxjs'

declare var google: any;

@Injectable()
export class ListingService {

  constructor(
    private _http: Http,
    private _loader: MapsAPILoader,
    private _zone: NgZone
  ) { }

  getLatLan(address: string){
    // SET OBSERVABLE
    return Observable.create(observer => {
      // LET GOOGLE SCRIPT LOAD BEFORE GEOCODER
      this._loader.load().then(() => {
      let geocoder = new google.maps.Geocoder();
      // GEOCODE ADDRESS
        geocoder.geocode( { 'address': address}, function(results, status) {
          // IF NO ERROR => return results
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            observer.complete();
            // IF ERROR => LOG err
          } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
          }
        });
      });
    })
  }

  getThreeListings(){
    return this._http.get("/api/getThreeListings")
    .map(data => data.json())
    .toPromise()
  }

  getAllActiveListings(){
    return this._http.get("/api/getActive")
    .map(data => data.json())
    .toPromise()
  }

  getAllSoldListings(){
    return this._http.get("/api/getSold")
    .map(data => data.json())
    .toPromise()
  }

  getListing(listing){
    return this._http.get("/api/getListing/" + listing)
    .map(data => data.json())
    .toPromise()
  }

  getAllListings(){
    return this._http.get("/api/getAllListings")
    .map(data => data.json())
    .toPromise()
  }

  changeSoldStatus(id){
    return this._http.post("/api/changeStatus", id)
    .map(data => data.json())
    .toPromise()
  }

  deleteImage(info){
    return this._http.post("/api/deleteImage", info)
    .map(data => data.json())
    .toPromise()
  }

  deleteListing(id){
    return this._http.post("/api/deleteListing", id)
    .map(data => data.json())
    .toPromise()
  }

  addListing(address){
    return this._http.post('/api/addlisting', address)
    .map(data => data.json())
    .toPromise()
  }

  addMoreImages(info){
    return this._http.post('/api/addMoreImages', info)
    .map(data => data.json())
    .toPromise()
  }

  changeAddress(info){
    return this._http.post('/api/changeAddress', info)
    .map(data => data.json())
    .toPromise()
  }
}
