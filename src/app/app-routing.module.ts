import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { LandingComponent } from './components/landing/landing.component';
import { ListingComponent } from './components/listing/listing.component';
import { AboutComponent } from './components/about/about.component';
import { ListingShowComponent } from './components/listing//listing-show/listing-show.component';
import { ListingEditComponent } from './components/listing/listing-edit/listing-edit.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'upload', canActivate: [AuthGuard], component: UploadComponent},
  {path: 'properties', component: ListingComponent},
  {path: 'about', component: AboutComponent},
  {path: 'show/:id', component: ListingShowComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent},
  {path: 'editlisting', component: ListingEditComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
