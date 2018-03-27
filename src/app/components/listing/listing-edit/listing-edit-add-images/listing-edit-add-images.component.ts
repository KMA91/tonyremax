import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UploadService } from '../../../../services/upload.service';
import { ListingService } from '../../../../services/listing.service';

const URL = '/api/upload';

@Component({
  selector: 'app-listing-edit-add-images',
  templateUrl: './listing-edit-add-images.component.html',
  styleUrls: ['./listing-edit-add-images.component.css']
})
export class ListingEditAddImagesComponent implements OnInit {

  @Output() showAdd = new EventEmitter();
  @Input() showAddID;
  public uploader:FileUploader = new FileUploader({url: URL});
  public files:any;
  public files_path: any;
  public showButton: boolean = false;

  constructor(
    public _uploadService: UploadService,
    public _listingService: ListingService
  ) { }

  ngDoCheck(){
    this.uploader.queue.length == this.files.length? this.showButton = true : this.showButton = false;
  }

  ngOnInit() {
    this.files = [];
    this.files_path = [];
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      response = JSON.parse(response);
      this.files.push(response);
      this.files_path.push(response.location);
    }
  }

  toggleShow(){
    this.showAdd.emit();
  }

  async addMoreImages(){
    var info = {
      paths: this.files_path,
      id: this.showAddID
    }
    var images = await this._listingService.addMoreImages(info);
    this.uploader.queue.length, this.files.length, this.files_path.length = 0;
    this.toggleShow();
  }
}
