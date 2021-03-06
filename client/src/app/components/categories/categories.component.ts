import { Component, OnInit } from '@angular/core';
import { Ensenanza } from 'src/app/models/ensenanza';
import { EnseñanzaService } from 'src/app/services/enseñanza/enseñanza.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class categoriesComponent implements OnInit {
  listEnsenyanza!: Ensenanza[];
  dataSearch!:string;
  dataFilter!:any;
  constructor(
    private _enseñanzaService: EnseñanzaService,
    private searchService: SearchService,
    private router:Router) { }

  ngOnInit(): void {
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.searchService.sendFiltersEmitter.subscribe(data=>{
      this.dataFilter = data;
      this.searchService.sendFilters.emit(this.dataFilter);
      this.changeOption();
    });
    this.changeOption();
  }
  changeOption(){
    if(this.dataSearch){
      let myUrl = '';
      myUrl = '';
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else if(this.dataFilter){
      this.searchSubject();
    }else{
      this.obtenerCurso();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerCurso() {
    this._enseñanzaService.findAllEnsenanza().subscribe(data => {
      this.listEnsenyanza = data;
    }, error => {
      console.log(error);
    })
  }
}
