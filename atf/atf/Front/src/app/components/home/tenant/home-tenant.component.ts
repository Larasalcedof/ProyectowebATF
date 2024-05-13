import { Component, Input, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FrameComponent } from '@components/frame/frame.component';
import { PropertycardComponent } from '@components/property/propertycard/propertycard.component';
import { PropertyResponse } from '@model/response/property/propertyResponse.interface';
import { PropertyService } from '@services/property.service';
import { SearchFormComponent } from './search-form/search-form.component';


@Component({
  selector: 'arriendoya-home-tenant',
  standalone: true,
  imports: [FrameComponent, CommonModule, ToastModule, PropertycardComponent, SearchFormComponent],
  templateUrl: './home-tenant.component.html',
  styleUrl: './home-tenant.component.scss',
  providers: [MessageService]
})
export class HomeTenantComponent implements OnInit{

  properties$!: Observable<PropertyResponse[]>

  ngOnInit(): void {
    this.getProperties()
  }

  constructor(private propertyService: PropertyService, private messageS: MessageService){}

  getProperties(){
    this.properties$ = this.propertyService.gePropertyPage()
      .pipe(catchError(e => {
        this.displayError(e) 
        throw new Error(e)
      }))
  }

  displayError(error: Error){
    console.error(error)
    this.messageS.add({
      severity: "error",
      summary: "Ha habido un error al obtener las propiedades",
      sticky: true
    })
  }

  doSearch(result: Observable<PropertyResponse[]>){
    this.properties$ = result
  }
}
