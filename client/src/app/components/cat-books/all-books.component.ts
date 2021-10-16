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
    this._BooksService.findAllBooks().subscribe(data => {
      console.log(data);
      this.listAllBooks = data;
    });
  }
}
