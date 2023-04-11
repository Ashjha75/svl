import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { CommonService } from './../services/commonService';
import { AuthService } from './auth.service';
import { CanActivateChild } from '@angular/router/src/interfaces';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
  
    // this.commonService.isReadOnlyScreen = this.commonService.forceReadOnlyMode || this.commonService.identifyAccess(url);
    // if (this.commonService.goToHomePage && !this.authService.getLoginStatus()) {
    //   this.router.navigate(['/dashboard/homeScreen']);
    //   this.authService.setLoginStatus(true);
    //   return true;
    // } else if (this.authService.getLoginStatus() || this.commonService.goToHomePage) {
    //   return this.isAllowedToAccess(url);
    // } else {
    //   this.router.navigate(['/Login']);
    //   return false;
    // }
    return false;
  }
  isAllowedToAccess(url) {
    // if(url == '/dashboard/homeScreen'){
    //   return true;
    // }
    // if (!this.commonService) {
    //   return this.unAuthorizedAction();
    // }
    // let res = this.commonService.getSecurityObject();
    // if (!res || !res.accessMap || (url != '' && (res.accessMap[url] === undefined || res.accessMap[url].accessMode === 'h' ) )) {
    //   return this.unAuthorizedAction();
    // }
    // return true;
  }
  unAuthorizedAction(): any {
    this.router.navigate(['error']);
    return false;
  }

}
