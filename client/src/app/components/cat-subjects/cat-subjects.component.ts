import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Courses } from 'src/app/models/courses';

@Component({
  selector: 'app-cat-subjects',
  templateUrl: './cat-subjects.component.html',
  styleUrls: ['./cat-subjects.component.css']
})
export class CatSubjectsComponent implements OnInit {
  listSubjects!: Courses[];
  constructor(private route : ActivatedRoute, private _courseService:CoursesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      console.log(params.ensenanza,params.curso);
      localStorage.setItem('ensenanza',params.ensenanza);
      localStorage.setItem('curso',params.curso);
    })
    this.obtenerSubject();
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
        console.log(subjects);
        this.listSubjects = subjects;
      },error =>{
        console.log(error);
      })
    }
  }
}
