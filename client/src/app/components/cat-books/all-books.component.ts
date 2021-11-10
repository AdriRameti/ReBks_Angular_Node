import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  listAllBooks!: Books[];
  dataSearch!:string;
  constructor(
    private _BooksService: BooksService,
    private searchService: SearchService,
    private router:Router) { }

  ngOnInit(): void {
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();
  }
  changeOption(){
    if(this.dataSearch){
      let myUrl = '';
      myUrl = 'books';
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerTodosLibros();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerTodosLibros(){
    let limitBooks : number =  parseInt(localStorage.getItem('limit') || "0");
    let skip : number = parseInt(localStorage.getItem('skip') || '0');
    this._BooksService.findAllBooks(limitBooks,skip).subscribe(data => {
      this._BooksService.paginationEmitter.emit(data);
      this.listAllBooks = data;
    });
  }
}
