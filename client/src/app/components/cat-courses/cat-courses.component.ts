import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Courses } from 'src/app/models/courses';
@Component({
  selector: 'app-cat-courses',
  templateUrl: './cat-courses.component.html',
  styleUrls: ['./cat-courses.component.css']
})
export class CatCoursesComponent implements OnInit {
  listCourses!: Courses[];

  constructor(private route: ActivatedRoute, private _coursesSercice: CoursesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params.titulo);
      localStorage.setItem('ensenanza', params.titulo);
    });
    this.obtenerCourses();
  }

  obtenerCourses() {
    let tituEnsen: string | null = localStorage.getItem('ensenanza');
    if (tituEnsen) {
      this._coursesSercice.findEnsCourses(tituEnsen).subscribe(data => {
        this.listCourses = data;
        console.log(this.listCourses);
      }, error => {
        console.log(error);
      })
    }

  }
}
