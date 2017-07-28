import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Router} from "@angular/router";
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   model: any = {};
    error = '';
  constructor(private authService : AuthService,  private router: Router) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.authService.login(this.model.username, this.model.password)
      .then( () => {
        this.router.navigate([''])
      })
      .catch( err => this.error =  'Username or password is incorrect');        
  };

}
