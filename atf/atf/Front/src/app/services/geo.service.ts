import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GeoService{
    private static readonly COLOMBIA_API_URL = "https://api-colombia.com/api/v1"

    constructor(private http: HttpClient){}

    getDepartments(): Observable<Department[]>{
        return this.http.get<Department[]>(`${GeoService.COLOMBIA_API_URL}/Department`)
    }

    getCitiesByDepartmentId(id: number): Observable<string[]>{
        return this.http.get<string[]>(`${GeoService.COLOMBIA_API_URL}/Department/${id}/cities`)
    }
    
}

export interface Department{
    id: number
    name: string
}