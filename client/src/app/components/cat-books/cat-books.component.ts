import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-books',
  templateUrl: './cat-books.component.html',
  styleUrls: ['./cat-books.component.css']
})
export class CatBooksComponent implements OnInit {
   
  listBooks !: Books[];
  dataSearch!:string;
  constructor(
    private route : ActivatedRoute, 
    private _BooksService: BooksService,
    private searchService: SearchService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      localStorage.setItem('asignatura',params.asignaturas);
    })

    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();
  }

  changeOption(){
    if(this.dataSearch){
      let asignaturas : string | null = localStorage.getItem('asignatura');
      let myUrl = '';
      myUrl = 'books/'+asignaturas;
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerLibros();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerLibros(){
    let asignaturas : string | null = localStorage.getItem('asignatura');
    let curso : number = parseInt(localStorage.getItem('curso') || "0");
    let tituEnsen: string | null = localStorage.getItem('ensenanza');
    if(asignaturas && curso && tituEnsen){
      this._BooksService.findBooks(asignaturas,curso,tituEnsen).subscribe(data =>{
        this._BooksService.paginationEmitter.emit(data);
        let limitBooks : number =  parseInt(localStorage.getItem('limit') || "0");
        let skip : number = parseInt(localStorage.getItem('skip') || '0');
        if(asignaturas && curso && tituEnsen&&limitBooks){
          this._BooksService.findBooksPag(asignaturas,curso,tituEnsen,limitBooks,skip).subscribe(data =>{
            this.listBooks = data;
            console.log(data);
          })
        }else{
          this.listBooks = data;
        }
      },error=>{
        console.log(error);
      })
    }else{
      console.log('Error en las variables');
    }
  }

}
