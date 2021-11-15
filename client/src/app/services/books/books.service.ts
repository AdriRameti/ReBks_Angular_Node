import { Injectable, Output ,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
@Output() paginationEmitter:EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  findBooks(asignaturas:string,curso:number,tituEnsen:string): Observable <any>{
    return this.http.get(environment.url+'/books/'+asignaturas+'/'+curso+'/'+tituEnsen);
  }

  findDetailsBook(slug:string):Observable <any>{
    return this.http.get(environment.url+'/books/'+slug);
  }

  findAllBooks(limit:number,skip:number):Observable <any>{
    return this.http.get(environment.url+'/books/pag?limit='+limit+'&skip='+skip);
  }
  findSearch(search:string,tipo:Number):Observable<any>{
    return this.http.get(environment.url+'/books/'+search+'/'+tipo);
  }
  findBooksPag(asignaturas:string,curso:number,tituEnsen:string,limit:number,skip:number): Observable <any>{
    return this.http.get(environment.url+'/books/'+asignaturas+'/'+curso+'/'+tituEnsen+'?limit='+limit+'&skip='+skip);
  }
  favorite():Observable<any>{
    return this.http.get(environment.url+'/books');
  }
  unfavorite():Observable<any>{
    return this.http.get(environment.url+'/books');
  }
  comments(body:Object):Observable<any>{
    return this.http.post(environment.url+'/books/comments',body);
  }
  deleteComment(body:Object):Observable<any>{
    return this.http.post(environment.url+'/books/comments/delete',body)
  }
  booksUser(limit:Number,skip:Number,id:String):Observable<any>{
    return this.http.get(environment.url+'/books/user/'+limit+'/'+skip+'/'+id);
  }
  updateComment(body:Object):Observable<any>{
    return this.http.post(environment.url+'/books/comments/fav',body);
  }
}
