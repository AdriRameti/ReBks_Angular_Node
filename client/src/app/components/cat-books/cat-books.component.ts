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
      console.log(params.asignaturas);
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

        this.listBooks = data;
        console.log(this.listBooks);
      },error=>{
        console.log(error);
      })
    }else{
      console.log('Error en las variables');
    }
  }
}
