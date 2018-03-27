import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UploadService } from '../../services/upload.service';
import { ListingService } from '../../services/listing.service';

const URL = '/api/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public files:any;
  public files_path: any;
  public error: String;
  public showButton: boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

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
    // console.log(FileUploader);
  }

  addListing(address){

    address.value["paths"] = this.files_path;

    if(address.value.sold === ''){
      address.value.sold = false;
    }

    this._listingService.addListing(address.value)
    .then(()=> {
      this.uploader.clearQueue();
      address.resetForm();
      this.files = [];
      this.files_path = [];
    })
    .catch((err) =>
    this.error = err._body
    )

  }

  deleteListingImage(originalName, size, s3Name){

    for(var i = 0; i < this.files.length; i++){
      if(this.files[i].key == s3Name){
        this.files.splice(i, 1)
      }
    }

    for(var i = 0; i < this.uploader.queue.length; i++){
      if(this.uploader.queue[i]._file.name == originalName && this.uploader.queue[i]._file.size == size){
        this.uploader.queue.splice(i, 1);
        break;
      }
    }

    s3Name = {s3Name}

    this._uploadService.removeImage(s3Name)
    .then()
    .catch()
  }

  cancel(){

    this.files_path.forEach( async (s3Name) => {
      await this._uploadService.removeImage({s3Name})
    })

    location.reload();
  }

}
