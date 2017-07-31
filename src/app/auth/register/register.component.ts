import { Component, OnInit } from '@angular/core';
import{User} from "../../models/user"
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from '../../services/auth.service'
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private model: User = new User();
  private  errors = [];
  private  returnUrl: string;
  constructor(private authService : AuthService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if(this.authService.isAuthenticated) {
        

        this.router.navigate([this.returnUrl]);

     } ;
  }

  sign() {
     this.authService.sign(this.model)
      .subscribe( (data) => {

          this.router.navigate(['login'])
      }, resp =>  { 
        this.errors =  resp.error;
      });     
  }



}
