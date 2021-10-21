import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
@Component({
  selector: 'app-filter-courses',
  templateUrl: './filter-courses.component.html',
  styleUrls: ['./filter-courses.component.css']
})
export class FilterCoursesComponent implements OnInit {
  filtroSeleccionado:string = '';
  filtro2Seleccionado:string = '';
  filtroCurso:Number = -1;
  constructor(
    private searchService:SearchService,
    private router:Router,
    private _booksService:BooksService
  ) { }

  ngOnInit(): void {
  }
  filtro(){
    switch(this.filtro2Seleccionado){
      case 'Primero':
        this.filtroCurso = 1;
        break;
      case 'Segundo':
        this.filtroCurso = 2;
        break;
      case 'Tercero':
        this.filtroCurso = 3;
        break;
      case 'Cuarto':
        this.filtroCurso = 4;
        break;
    }

  }

  sendFilters(){
    this.router.navigate(['search'])
    this._booksService.findSearch(this.filtroSeleccionado,this.filtroCurso).subscribe(data =>{
      this.searchService.sendFiltersEmitter.emit(data);
    });
  }
  allBooks(){
    this.router.navigate(['books']);
  }
}
