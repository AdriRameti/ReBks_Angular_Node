import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { CatBooksComponent } from './cat-books.component';
import { AllBooksComponent } from './all-books.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CatBooksComponent,
    AllBooksComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class BooksModule { }
