import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Courses } from 'src/app/models/courses';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cat-courses',
  templateUrl: './cat-courses.component.html',
  styleUrls: ['./cat-courses.component.css']
})
export class CatCoursesComponent implements OnInit {
  listCourses!: Courses[];
  dataSearch!:string;
  constructor(
    private route: ActivatedRoute,
     private _coursesSercice: CoursesService,
     private searchService: SearchService,
     private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      localStorage.setItem('ensenanza', params.titulo);
    });
    this.searchService.searchEmitter.subscribe(data=>{
      this.dataSearch = data;
      this.changeOption();
    });
    this.changeOption();
  }
  changeOption(){
    if(this.dataSearch){
      let tituEnsen: string | null = localStorage.getItem('ensenanza');
      let myUrl = '';
      myUrl = 'courses/'+tituEnsen;
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerCourses();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerCourses() {
    let tituEnsen: string | null = localStorage.getItem('ensenanza');
    if (tituEnsen) {
      this._coursesSercice.findEnsCourses(tituEnsen).subscribe(data => {
        this.listCourses = data;

      }, error => {
        console.log(error);
      })
    }

  }
}
