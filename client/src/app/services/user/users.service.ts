import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  register(body:Object): Observable <any>{
    return this.http.post(environment.url+'/user/register',body);
  }
  login(body:Object): Observable <any>{
    return this.http.post(environment.url+'/user/login',body);
  }
  update(body:Object):Observable<any>{
    return this.http.put(environment.url+'/user/update',body);
  }
  showFav(slug:String):Observable<any>{
    return this.http.get(environment.url+'/user/showFav/'+slug);
  }
  favorite(body:Object):Observable<any>{
    return this.http.post(environment.url+'/user/favorite',body);
  }
  showFollow(slug:string):Observable<any>{
    return this.http.get(environment.url+'/user/showFoll/'+slug)
  }
  follow(body:Object):Observable<any>{
    return this.http.post(environment.url+'/user/follow',body);
  }
  comments(body:Object):Observable<any>{
    return this.http.post(environment.url+'/user/comments',body);
  }
  showComments(id:String):Observable<any>{
    return this.http.get(environment.url+'/user/'+id);
  }
  rating(book:String,user:String,rate:Number):Observable<any>{
    return this.http.get(environment.url+'/user/rating/show?book='+book+'&user='+user+'&rate='+rate);
  }
  showRating(id:String):Observable<any>{
    return this.http.get(environment.url+'/user/rating/show/mostrar?id='+id);
  }
}
