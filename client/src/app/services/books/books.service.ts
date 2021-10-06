import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  findBooks(asignaturas:string,curso:number,tituEnsen:string): Observable <any>{
    return this.http.get(environment.url+'/books/'+asignaturas+'/'+curso+'/'+tituEnsen);
  }

  findDetailsBook(slug:string):Observable <any>{
    return this.http.get(environment.url+'/books/'+slug);
  }

  findAllBooks():Observable <any>{
    return this.http.get(environment.url+'/books');
  }
}
