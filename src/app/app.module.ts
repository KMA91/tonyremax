import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { AboutComponent } from './components/about/about.component';
import { ListingComponent } from './components/listing/listing.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListingShowComponent } from './components/listing//listing-show/listing-show.component';
import { ListingEditComponent } from './components/listing/listing-edit/listing-edit.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { UploadService } from './services/upload.service';
import { ListingService } from './services/listing.service';
import { MessageService } from './services/message.service';
import { AuthGuard } from './guard/auth.guard';
import { ListingEditAddImagesComponent } from './components/listing/listing-edit/listing-edit-add-images/listing-edit-add-images.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    FileDropDirective,
    UploadComponent,
    AboutComponent,
    ListingComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    ListingShowComponent,
    ContactComponent,
    LoginComponent,
    ListingEditComponent,
    ListingEditAddImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxCarouselModule,
    Ng2DeviceDetectorModule.forRoot(),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAyGRgKEeUMHzVkwwZ0JZ7y03NaZ1_RG0o'
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UploadService, ListingService, LoginService, MessageService, AuthGuard, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
