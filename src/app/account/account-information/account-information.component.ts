import { Component, OnInit } from '@angular/core';
import {BookService} from '../../services/book.service'
import { FormsModule }   from '@angular/forms';
import { Router} from "@angular/router";
import {UserStat} from '../../models/user-stat'

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit {

  private userStat : UserStat = new UserStat();
  private userName;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getStatistics().subscribe((data) => {
      this.userStat = data.statistic;
      this.userName = data.name;
    });
  }

}
