import { Component, OnInit } from '@angular/core';
import{User} from "../../models/user"
import { Router} from "@angular/router";
import {AuthService} from '../../services/auth.service'
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: User = new User();
    errors = [];
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
        this.authService.logout();
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
