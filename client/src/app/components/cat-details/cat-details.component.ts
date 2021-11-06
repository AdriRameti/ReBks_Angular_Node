import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.css']
})
export class CatDetailsComponent implements OnInit {

  listDetails!: Books[];
  dataSearch!:string;
  constructor(
    private route : ActivatedRoute, 
    private _BooksService : BooksService,
    private searchService: SearchService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      localStorage.setItem('slug',params.slug);
    });
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();
  }
  changeOption(){
    if(this.dataSearch){
      let slug : string | null = localStorage.getItem('slug');
      let myUrl = '';
      myUrl = 'details/'+slug;
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerDetails();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerDetails(){
    let slug : string | null = localStorage.getItem('slug');
    if(slug){
      this._BooksService.findDetailsBook(slug).subscribe(data=>{
        this.listDetails = data;
      });
    }

  }
}
