import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   private model: any = {};
    private error = '';
    private returnUrl: string;
     
  constructor(private authService : AuthService,  private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    //this.authService.logout();
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
     if(this.authService.isAuthenticated) {
        this.router.navigate([this.returnUrl]);

     } ;
      
  }

  login() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe( (success) => {
        this.router.navigate([this.returnUrl])
      }, (response) => {
        this.error =  response.error;
      });   
  };

}
