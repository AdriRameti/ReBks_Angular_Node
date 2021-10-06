import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  listAllBooks!: Books[];
  constructor(private _BooksService: BooksService) { }

  ngOnInit(): void {
    this.obtenerTodosLibros();
  }

  obtenerTodosLibros(){
    this._BooksService.findAllBooks().subscribe(data => {
      console.log(data);
      this.listAllBooks = data;
    });
  }
}
