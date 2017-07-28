import { Component, OnInit } from '@angular/core';
import {Book} from '../../models/book'
import {BookService} from '../../services/book.service'
import { FormsModule }   from '@angular/forms';
import { Router} from "@angular/router";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  model: Book = new Book();
    errors = [];  
  constructor(private bookService: BookService, private router : Router) { }

  ngOnInit() {
    
  }


  add() {
     this.bookService.createBook(this.model).subscribe(
          () => {
               this.router.navigate([''])
          }
     );
  }
}
