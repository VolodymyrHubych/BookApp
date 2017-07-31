import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from  '@angular/router';
import {Book} from '../../models/book'
import {BookService} from '../../services/book.service'

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {


  private bookId:number;
  private book  : Book = new Book();

    canOrder : boolean;
  
  constructor(private activatedRoute:ActivatedRoute, private router :Router, private bookService: BookService ) { 
     this.bookId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
     this.bookService.getBook(this.bookId).subscribe(
       (resp) => {
          if(!resp) {
            this.router.navigate(['notfound']);
          } 
          this.book = resp.data;
          this.canOrder  = resp.canOrder;       }
     );

    
  }

  order() {
    this.bookService.orderBook(this.bookId).subscribe(
      (data) => {
         if (!data) {
              console.log('Fatal error');    
         }
         this.router.navigate(['mybooks']);

      }
    )
  }

  removeOrder() {
    this.bookService.removeOrder(this.bookId).subscribe(
       (data) => {
          if (!data) {
              console.log('Fatal error');    
         } else {
             this.router.navigate(["mybooks"]);
         }
       }
     )
  }

}
