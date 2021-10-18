import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  numberPages:number[]=[];
  pageSelected:number = 1;
  skip:number = 0;
  constructor(
    private booksService:BooksService

  ) { }

  ngOnInit(): void {
    this.showPag();
  }

  showPag(){
    this.booksService.paginationEmitter.subscribe(data=>{
      let parseIntData:number = parseInt(data.length,10);
      let limitBooks:string = '10';
      localStorage.setItem('limit',limitBooks);
      let myPages = Math.ceil(parseIntData/parseInt(limitBooks,10));
      for(let i = 0; i< myPages;i++){
        this.numberPages.push(i+1);
      }
    });
  }

  page(datos:any){
    let clickPageNum : number = datos;
    let limit:number = parseInt(localStorage.getItem('limit')||'0');
    let skip !: number;
    skip = (clickPageNum-1)*limit;
    localStorage.setItem('skip',skip.toString());
    window.location.reload();
  }
}
