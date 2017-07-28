import { Component } from '@angular/core';
import {AuthService} from './services/auth.service'
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *
   */
  constructor(private authService : AuthService) {
          
  }

  title = 'app';
 
  
}
