import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service'
import {Router} from '@angular/router'
import {Book} from '../../models/book'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService : BookService, private router: Router) { }

  private books : Book[] = []; 

  ngOnInit() {
     this.bookService.getAllBooks().subscribe( (data: Book[]) => {
       this.books=data;
      });
  }

  gotoInfo(id:number) {
     this.router.navigate(['book/'+id]);
  }

}
