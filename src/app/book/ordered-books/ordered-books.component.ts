import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service'
import {Router} from '@angular/router'
import {Book} from '../../models/book'

@Component({
  selector: 'app-ordered-books',
  templateUrl: './ordered-books.component.html',
  styleUrls: ['./ordered-books.component.css']
})

export class OrderedBooksComponent implements OnInit {


  constructor(private bookService : BookService, private router: Router) { }

  private books : Book[] = []; 


  ngOnInit() {
     this.bookService.getOrderedBooks().subscribe( (data) => {
       this.books=data;
      });
  }

  removeOrder(bookId : number) {
      this.bookService.removeOrder(bookId).subscribe(
       (data) => {
          if (!data) {
              console.log('Fatal error');    
         } else {
             this.bookService.getOrderedBooks().subscribe( (data) => {
                this.books=data;
            });
         }
       }
     )

  }

   gotoInfo(id:number) {
     this.router.navigate(['book/'+id]);
  }

  gotoHome() {
    this.router.navigate(['']);
  }

}
