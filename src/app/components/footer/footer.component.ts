import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public loggedIn;
  public subscription: Subscription;

  constructor(
    private _loginService: LoginService
  ) {
    this.subscription = this._loginService.isLoggedIn()
    .subscribe(loggedin => {
      this.loggedIn = loggedin
    })
  }

  ngOnInit() {
    this.getLoggedIn()
  }

  getLoggedIn(){

    if(localStorage.getItem('token')){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

  logout(){
    this._loginService.logOut();
    this.loggedIn = false;
  }

}
