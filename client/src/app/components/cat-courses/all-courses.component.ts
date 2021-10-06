import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Courses } from 'src/app/models/courses';
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  listAllCourses!: Courses[];
  constructor(private _CoursesService: CoursesService) { }

  ngOnInit(): void {
    this.obtenerTodosCursos();
  }

  obtenerTodosCursos(){
    this._CoursesService.findAllCourses().subscribe(data => {
      console.log(data);
      this.listAllCourses = data;
    });
  }
}
