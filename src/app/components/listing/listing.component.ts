import { Component, OnInit, Injectable, NgZone } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { fadeInAnimation } from '../../_animations/index';
import { GoogleMapsAPIWrapper, MapsAPILoader, AgmMap } from '@agm/core';
import { Observable, Observer } from 'rxjs';

declare var google: any;
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

@Injectable()
export class ListingComponent extends GoogleMapsAPIWrapper implements OnInit{

  // SHOWN LISTINGS
  public listings = [];
  // LISTINGS ARRAY AFTER API AND BEING SEPARATED
  public listingsArray = [];
  // CHANGE SHOWN BETWEEN ACTIVE/SOLD
  // public active:boolean = true;
  // COUNTER FOR LENGTH OF PAGES
  public leftArrow: boolean = false;
  // COUNTER FOR LENGTH FOR COLOR CHANGE
  public rightArrow: boolean = false;
  // public geo: google_geocoding = new google_geocoding();
  public latitude: number = 34.078052;
  public longitude: number = -118.113003;
  public zoom: number = 8;

  constructor(
    private _listingService: ListingService,
    private __loader: MapsAPILoader,
    private gmaps: GoogleMapsAPIWrapper,
    private __zone: NgZone
  ) {
    super(__loader, __zone);
  }

  ngOnInit() {
    this.getAllListings();
  }

  // GET LAT & LONG FROM SERVICES
  getLatLan(address: string) {
    this._listingService.getLatLan(address).subscribe(value => {
      // needs to run inside zone to update the map
      this.__zone.run(() => {
        this.latitude = value.lat();
        this.longitude = value.lng();
        // console.log(value.lat());
        // console.log(value.lng());
      });
      this.gmaps.setCenter({ lat: this.latitude, lng: this.longitude });
    })
  }

  getAllListings(){
    // GET ALL LISTINGS FROM API
    this._listingService.getAllListings()
    .then(listings => {
      // LISTINGS FROM API IS NOW SAVED
      let allListings = listings;
      // USED TO PLACE LISTINGS FOR BOTTOM ALGO
      let tempArr = [];
      // every 4 listings push tempArray into listingsArray
      for(var i = 0 ; i < allListings.length; i++){

        if(tempArr.length < 3){
          tempArr.push(allListings[i]);
        }else{
          this.listingsArray.push(tempArr);
          tempArr = [];
          tempArr.push(allListings[i]);
        }
      }
      // if there are any remainding listings not pushed in, push it in
      if(tempArr.length){
        this.listingsArray.push(tempArr);
        tempArr = [];
      }
      // show first index of listings on load
      this.listings = this.listingsArray[0];
    })
    .catch();
  }

  leftClick(){
    let prev = this.flipPage(-1, "prev");
    // let pageBeforePrev = this.flipPage(-2);
    if(prev){
      this.listings = prev;
    }
  }

  rightClick(){
    let next = this.flipPage(1, "after");
    // let pageAfterNext = this.flipPage(2);
    if(next){
      this.listings = next;
    }
  }

  // flip page method
  // if clicking right on end of listings, return the first array of listings
  // if clicking left at beginning of listings, return the last array of listings
  flipPage(number, position){
    var nextPage = this.listingsArray[
        this.listingsArray.findIndex(
        listing =>
        listing === this.listings
      )
      + number
    ]
    if(nextPage){
      return nextPage;
    }else if(position == "after"){
      return this.listingsArray[0];
    }else if(position == "prev"){
      return this.listingsArray[this.listingsArray.length-1]
    }
  }
}
