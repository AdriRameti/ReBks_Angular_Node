import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Courses } from 'src/app/models/courses';
import { SearchService } from 'src/app/services/search/search.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  listAllCourses!: Courses[];
  dataSearch!:string;
  constructor(
    private _CoursesService: CoursesService,
    private searchService: SearchService,
    private router:Router
    ) { }

  ngOnInit(): void {
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
      myUrl = 'courses';
      localStorage.setItem('BeforeUrl',myUrl);
      this.searchSubject();
    }else{
      this.obtenerTodosCursos();
    }
  }
  searchSubject(){
    this.router.navigate(['search']);
  }
  obtenerTodosCursos(){
    this._CoursesService.findAllCourses().subscribe(data => {
      console.log(data);
      this.listAllCourses = data;
    });
  }
}
