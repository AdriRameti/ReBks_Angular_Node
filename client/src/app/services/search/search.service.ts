import { Injectable,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Output() searchEmitter:EventEmitter<string> = new EventEmitter<string>();
  @Output() sendSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFilters : EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFiltersEmitter : EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

}
