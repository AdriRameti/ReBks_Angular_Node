import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
@Component({
  selector: 'app-cat-books',
  templateUrl: './cat-books.component.html',
  styleUrls: ['./cat-books.component.css']
})
export class CatBooksComponent implements OnInit {
   
  listBooks !: Books[];
  constructor(private route : ActivatedRoute, private _BooksService: BooksService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      console.log(params.asignaturas);
      localStorage.setItem('asignatura',params.asignaturas);
    })

    this.obtenerLibros();
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
