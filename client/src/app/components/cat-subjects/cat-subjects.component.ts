import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Courses } from 'src/app/models/courses';
import { SearchService } from 'src/app/services/search/search.service';
import { BooksService } from 'src/app/services/books/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-subjects',
  templateUrl: './cat-subjects.component.html',
  styleUrls: ['./cat-subjects.component.css']
})
export class CatSubjectsComponent implements OnInit {
  listSubjects!: Courses[];
  dataSearch!:string;
  constructor(
    private route : ActivatedRoute, 
    private _courseService:CoursesService, 
    private searchService:SearchService,
    private _booksService:BooksService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      localStorage.setItem('ensenanza',params.ensenanza);
      localStorage.setItem('curso',params.curso);
    });
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });

    // this.obtenerSubject();
    this.changeOption();
  }
  changeOption(){
    if(this.dataSearch){
      let tituEnsen: string | null = localStorage.getItem('ensenanza');
      let curso: string | null = localStorage.getItem('curso');
      let myUrl = '';
      myUrl = 'subjects/'+tituEnsen+'/'+curso;
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerSubject();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerSubject(){
    let tituEnsen: string | null = localStorage.getItem('ensenanza');
    let curso: string | null = localStorage.getItem('curso');

    if(tituEnsen && curso){
      this._courseService.findSubjects(tituEnsen,curso).subscribe(data => {
        
        var subjects = data[0].asignaturas;
        subjects.sort(function(a:any, b:any) {
          return a.length - b.length;
        })
        this.listSubjects = subjects;
      },error =>{
        console.log(error);
      })
    }
  }
}
