import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {AuthService} from '../services/auth.service'


 @Injectable()
export class AnonimGuard implements CanActivate{
    /**
     *
     */
     constructor(private authService : AuthService,  private router: Router) {        
    }
   
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
            let url: string = state.url;
            return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {

             if (!this.authService.isAuthenticated) {  return true; }
            this.router.navigate(['']);
            return false;

    }
}