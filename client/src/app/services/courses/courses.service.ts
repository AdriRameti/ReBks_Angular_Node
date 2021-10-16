import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  findEnsCourses(tituEnsen: string): Observable<any>{
    return this.http.get(environment.url+'/courses/'+tituEnsen);
  }

  findSubjects(tituEnsen: string,curso:string) :Observable<any>{
    return this.http.get(environment.url+'/courses/'+tituEnsen+'/'+curso);
  }

  findAllCourses():Observable <any>{
    return this.http.get(environment.url+'/courses');
  }

 
}
