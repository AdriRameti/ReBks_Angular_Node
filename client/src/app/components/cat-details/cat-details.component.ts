import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { BooksService } from 'src/app/services/books/books.service';
import { Books } from 'src/app/models/books';
@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.css']
})
export class CatDetailsComponent implements OnInit {

  listDetails!: Books[];
  constructor(private route : ActivatedRoute, private _BooksService : BooksService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      console.log(params.slug);
      localStorage.setItem('slug',params.slug);
    });

    this.obtenerDetails();
  }

  obtenerDetails(){
    let slug : string | null = localStorage.getItem('slug');
    if(slug){
      this._BooksService.findDetailsBook(slug).subscribe(data=>{
        console.log(data);
        this.listDetails = data;
      });
    }

  }
}
