import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyDetailedResponse, PropertyResponse } from '../model/response/property/propertyResponse.interface';
import { Router } from '@angular/router';
import { PropertyRequest } from '@model/request/property/propertyRequest.interface';
import { environment } from '@environments/environment';
import { PropertyDisableRequest } from '@model/request/property/propertyDisableRequest.interface';
import { PropertyUpdateRequest } from '@model/request/property/propertyUpdateRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient, private router: Router) { }

  gePropertyPage(): Observable<PropertyResponse[]> {
    return this.http.get<PropertyResponse[]>(`${environment.apiUrl}/property/list`)
  }

  getPropertyById(id: number): Observable<PropertyDetailedResponse>{
    return this.http.get<PropertyDetailedResponse>(`${environment.apiUrl}/property/details/${id}`)
  }

  getLandLordProperties(): Observable<PropertyResponse[]>{
    return this.http.get<PropertyResponse[]>(`${environment.apiUrl}/property/list-landlord`)
  }

  createProperty(request: PropertyRequest, image: File): Observable<any>{
    const formData = new FormData();
    formData.append('json', JSON.stringify(request))
    formData.append('file', image)
    return this.http.post(`${environment.apiUrl}/property/create`, formData)
  }

  disableProperty(request: PropertyDisableRequest){
    return this.http.delete(`${environment.apiUrl}/property/disable`, {body: request})
  }

  updateProperty(request: PropertyUpdateRequest): Observable<any>{
    return this.http.put(`${environment.apiUrl}/property/update`, request)
  }
}
