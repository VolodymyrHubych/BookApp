import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {AuthService} from './auth.service'
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs';
import {Book} from '../models/book'

@Injectable()
export class BookService {
   Url = environment.Url;
  constructor(private http: Http) {  }

  getAllBooks() {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.Url + 'books/all', options).map(res => res.json());
  }

  createBook(book:Book) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.Url + 'books/add', book, options).map(res => {
            let response = res.json();

            if (response.message) {
                throw Observable.throw(response.message);  
            } 
            return response;

       }) ;  
  }

  getBook( id : number) {
       let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.Url + 'books/' + id, options).map(res => res.json());
  }

  orderBook(id :number) {
       let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.Url + 'books/order/' + id , options).map(res => res.json());
  }

  getOrderedBooks() {
       let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.Url + 'books/myorders', options).map(res => res.json());
  }

  removeOrder(id :number) {
       let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });
       return this.http.get(this.Url + 'books/removeOrder/' + id, options).map(res => res.json());
  }

  canOrder(id : number) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });
       return this.http.get(this.Url + 'books/canOrder/' + id, options).map(res => res.json());
  }

  getOwnBooks() {
       let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.get(this.Url + 'books/mybooks', options).map(res => res.json());
  }


  editBook(book: Book) {
       let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.Url + 'books/edit', book, options).map(res => {
            let response = res.json();

            if (response.message) {
                throw Observable.throw(response.message);  
            } 
            return response;

       }) ;  

  }

  rewoveBook(id : number) {
         let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });
       return this.http.get(this.Url + 'books/delete/' + id, options).map(res => res.json());
  }

  getStatistics() 
  {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
      let options = new RequestOptions({ headers: headers });
       return this.http.get(this.Url + 'books/statistic', options).map(res => res.json());
  }

}
