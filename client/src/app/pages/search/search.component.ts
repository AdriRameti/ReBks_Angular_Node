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
  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
    this.searchService.sendSearch.subscribe(data=>{
      console.log(data);
      this.listSearchBooks = data;
    })
  }

}
