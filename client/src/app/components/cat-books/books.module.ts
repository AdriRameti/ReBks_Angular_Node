import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { CatBooksComponent } from './cat-books.component';
import { AllBooksComponent } from './all-books.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavButtonComponent } from '../favorite/fav-button/fav-button.component';
import { FollowButtonComponent } from '../follow/follow-button/follow-button.component';
@NgModule({
  declarations: [
    CatBooksComponent,
    AllBooksComponent,
    PaginationComponent,
    FavButtonComponent,
    FollowButtonComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class BooksModule { }
