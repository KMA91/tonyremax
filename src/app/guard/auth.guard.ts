import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token')){
        return true;
      }
      return false;
      // this._loginService.isLoggedIn()
      // .subscribe(message => {
      //   console.log(message);
      //   if(message){
      //     return true;
      //   }
      // })
      // this._router.navigate(['/'])
      // return false;
  }
}
