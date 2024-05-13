import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FrameComponent } from '@components/frame/frame.component';
import { PropertyResponse } from '@model/response/property/propertyResponse.interface';
import { PropertyService } from '@services/property.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Observable, catchError } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { PropertycardComponent } from '@components/property/propertycard/propertycard.component';
import { CreatePropertyComponent } from './create-property/create-property.component';

@Component({
    selector: 'arriendoya-home-landlord',
    standalone: true,
    templateUrl: './home-landlord.component.html',
    styleUrl: './home-landlord.component.scss',
    providers: [MessageService],
    imports: [ToastModule, CommonModule, FrameComponent, ButtonModule, PropertycardComponent, DialogModule,
      CreatePropertyComponent
    ]
})
export class HomeLandlordComponent implements OnInit {

  showDialog = false
  properties$!: Observable<PropertyResponse[]>

  constructor(private propertyService: PropertyService, private messageS: MessageService){}

  ngOnInit(): void {
    this.getProperties()
  }

  getProperties(){
    this.properties$ = this.propertyService.getLandLordProperties()
      .pipe(catchError(e => {
        this.displayError(e) 
        throw new Error(e)
      }))
  }

  showCreateDialog() {
    this.showDialog = true
  }


  displayError(error: Error){
    console.error(error)
    this.messageS.add({
      severity: "error",
      summary: "Ha habido un error al obtener las propiedades",
      sticky: true
    })
  }

}
