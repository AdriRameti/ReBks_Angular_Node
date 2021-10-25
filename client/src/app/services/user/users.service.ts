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
}
