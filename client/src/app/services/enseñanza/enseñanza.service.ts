import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnseñanzaService {

  constructor( private http: HttpClient) { }

  findAllEnsenanza() : Observable<any>{
    return this.http.get(environment.url+'/ensenanza');
  }
}
