import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../../services/listing.service';
import { fadeInAnimation } from '../../../_animations/index';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-listing-show',
  templateUrl: './listing-show.component.html',
  styleUrls: ['./listing-show.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }

})
export class ListingShowComponent implements OnInit {

  public imageSources = [];
  public listingid;
  public listing;
  public image;
  public imageindex = 0;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _listingService: ListingService
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((param)=> this.listingid = param.id)
    this.getListing(this.listingid);
  }

  getListing(listing){
    this._listingService.getListing(listing)
    .then((listing) => {
      this.listing = listing;
      for(var i = 0; i < this.listing.paths.length; i++){
        this.imageSources.push(this.listing.paths[i]);
      }
      this.image = this.listing.paths[0];
    })
    .catch()
  }

  nextImage(){
    if(this.listing.paths[this.imageindex + 1]){
      $('.img'+this.imageindex).removeClass("focusimage");
      this.image = this.listing.paths[this.imageindex + 1];
      this.imageindex ++;
      $('.img'+this.imageindex).addClass("focusimage");
    }else{
      $('.img'+this.imageindex).removeClass("focusimage");
      this.image = this.listing.paths[0];
      this.imageindex = 0;
      $('.img'+this.imageindex).addClass("focusimage");
    }
  }

  changeImage(index){
    $('.img'+this.imageindex).removeClass("focusimage");
    this.image = this.listing.paths[index];
    this.imageindex = index;
    $('.img'+this.imageindex).addClass("focusimage");
  }

  // previousImage(){
  //   if(this.listing.paths[this.imageindex - 1]){
  //     this.image = this.listing.paths[this.imageindex - 1];
  //     this.imageindex --;
  //   }else{
  //     this.image = this.listing.paths[this.listing.paths.length - 1];
  //     this.imageindex = this.listing.paths.length - 1;
  //   }
  // }
}
