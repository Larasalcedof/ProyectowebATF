import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SearchRequest } from '../model/request/search/searchRequest.interface';
import { PropertyResponse } from '../model/response/property/propertyResponse.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchPropertyService {

  constructor(private http: HttpClient) { }

  search(fields: SearchRequest): Observable<PropertyResponse[]>{
    return this.http.post<PropertyResponse[]>(`${environment.apiUrl}/property/search`, fields)
  }
}
