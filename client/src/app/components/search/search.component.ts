import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search/search.service';
import { Books } from 'src/app/models/books';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  listSearch!: Books[];
  searchValue!:string;
  constructor(
    private searchService:SearchService,
    private router:Router,
    private _booksService:BooksService,
    ) { }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(
      debounceTime(400)
      )
    .subscribe(value => {
      
      this.searchService.searchEmitter.emit(value);
      this.searchValue = value;
      this.printSearch();
    });
    // this.printSearch();
  }

  search = new FormControl('');

  printSearch(){
    let returnUrl : String | null = localStorage.getItem('BeforeUrl');
    if(this.searchValue){
    this._booksService.findSearch(this.searchValue,0).subscribe(data =>{
      console.log(data);
      this.searchService.sendSearch.emit(data);
    });
    }else{
      this.router.navigate([returnUrl]);
    }
  }
  
}
