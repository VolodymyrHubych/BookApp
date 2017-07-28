import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {Routes, RouterModule} from '@angular/router';

import {AuthService} from './services/auth.service';
import {BookService} from './services/book.service'
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './book/home/home.component'
import {AuthGuard} from './guards/authGuard';
import {AnonimGuard} from './guards/anonimGuard';
import { NotFoundComponent } from './book/not-found/not-found.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { JwtHelper} from 'angular2-jwt';
import { RegisterComponent } from './auth/register/register.component';
import { EqualValidator } from './directives/validate-equal.directive';
import { AddBookComponent } from './book/add-book/add-book.component';
import { BookInfoComponent } from './book/book-info/book-info.component';
import { OrderedBooksComponent } from './book/ordered-books/ordered-books.component';


const appRoutes: Routes =[
    {
       path: 'login',
        component: LoginComponent, 
        canActivate: [AnonimGuard]
    },
    {
      path:'',
      component: HomeComponent, 
      canActivate: [AuthGuard]
    },
    
    {
      path:'logout',
      component: LogoutComponent, 
      canActivate: [AuthGuard]
    },
     {
       path: 'sign',
        component: RegisterComponent, 
        canActivate: [AnonimGuard]
    },
      { 
         path:'addBook',
      component: AddBookComponent, 
      canActivate: [AuthGuard]

      },
    { path: 'book/:id',
     component: BookInfoComponent,
      canActivate: [AuthGuard]

    },
    {
        path: 'mybooks',
     component: OrderedBooksComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'**', 
      component: NotFoundComponent
    }
  
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    LogoutComponent,
    RegisterComponent,
    EqualValidator,
    AddBookComponent,
    BookInfoComponent,
    OrderedBooksComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard, AnonimGuard,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }

