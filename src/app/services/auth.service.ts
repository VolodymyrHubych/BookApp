import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import {User} from '../models/user'
import { Router} from "@angular/router";


@Injectable()
export class AuthService {

  isAuthenticated: boolean = false;
  tokenEndpoint = environment.token_endpoint;
  Url = environment.Url
 
  public token;

  constructor(private router: Router, private http: Http) { 
     this.isAuthenticated || (this.isAuthenticated = !!this.getToken());
  }
   

  login(username : string, password:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body = `grant_type=password&username=${username}&password=${password}`;
    return this.http.post(this.tokenEndpoint, body, {headers : headers}).map(res => {
      var response = res.json();
      if (response.error)
      {
          throw Observable.throw(response.error_description);  
      }
       this.setToken(response);       
       this.isAuthenticated = true;      
       return res.json();
    });
  }

  refreshToken() {

    let refToken = JSON.parse(localStorage.getItem('token')).refresh;

    if (refToken) {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      let body = `grant_type=refresh_token&refresh_token=${refToken}`;
       this.http.post(this.tokenEndpoint, body, options).map(res => {
        var response = res.json();
        if (response.error)
        {
            throw Observable.throw(response.error_description);  
        }
         
         return res.json();
      }).subscribe( (response) => {
         this.setToken(response);    
         this.isAuthenticated = true;      
      }, (error) => {
        this.router.navigate(['login'])
        this.logout();
      });
    }
  }

  private setToken(token) {
    window.localStorage.removeItem('token');
    window.localStorage.setItem('token', JSON.stringify(
                { 
                  token: token.access_token, 
                  exp: token.expires_in + Date.now(),
                  refresh: token.refresh_token
                }));

  }

  isExpired() {
    return JSON.parse(localStorage.getItem('token')).exp < Date.now();
  }

  getToken() {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      !this.isExpired() || this.refreshToken();
      return JSON.parse(localStorage.getItem('token')).token || null;
    } else {
      return null;
    }
  }

  sign(user : User) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
       return this.http.post(this.Url + 'account/register', JSON.stringify(user), options).map(res => {
            let response = res.json();

            if (response.success == false) {
                throw Observable.throw(response.body);  
            } 
            return response.body

       }) ;    
  }

  logout(): void {
        this.isAuthenticated = false;
        localStorage.removeItem('token');        
  }
  




}
