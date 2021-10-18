import { Component, NgModule, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { Books } from 'src/app/models/books';
@Component({
  selector: 'app-search-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponentPage implements OnInit {
   listSearchBooks!:Books[];
   listFiltersBooks!:Books[];
   listBooks!:Books[];
  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
    this.searchService.sendFilters.subscribe(datos=>{
      this.listFiltersBooks = datos;
      this.option();
    })
    this.searchService.sendSearch.subscribe(data=>{
      this.listSearchBooks = data;
      this.option();
    })

    this.option();
  }

  option(){
    if(this.listSearchBooks){
      this.listBooks = this.listSearchBooks;
    }else{
      this.listBooks = this.listFiltersBooks
    }
  }
}
