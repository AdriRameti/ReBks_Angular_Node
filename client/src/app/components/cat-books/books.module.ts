import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { CatBooksComponent } from './cat-books.component';
import { AllBooksComponent } from './all-books.component';

@NgModule({
  declarations: [
    CatBooksComponent,
    AllBooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ],
})
export class BooksModule { }
