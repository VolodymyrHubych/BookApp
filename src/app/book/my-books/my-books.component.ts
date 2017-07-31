import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service'

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {

  constructor(private bookService : BookService, private router: Router) { }

  private errors=[];
 private books : Book[] = []; 

 private model : Book = null;

 private getBooks() {
    this.bookService.getOwnBooks().subscribe( (data) => {
        this.books=data;
      });
 }

  ngOnInit() {
     this.getBooks();

  }

  edit() {
      this.bookService.editBook(this.model).subscribe((response) => {       
                 this.getBooks();
                 this.model = null;
                console.log('Changes saved');
               }, (response) => {
                 this.errors[0] = response.error;
               });
  }

  removeBook(id : number) {
      this.bookService.rewoveBook(id).subscribe( (resp) => {
            this.getBooks();
           console.log('Changes saved');
      });
  }
  
  gotoCreate() {
    this.router.navigate(['addBook'])
  }

}
