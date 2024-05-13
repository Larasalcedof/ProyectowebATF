import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RentSolicitudeRequest } from '@model/request/solicitude/rentSolicitudeRequest.interface';
import { PropertyResponse } from '@model/response/property/propertyResponse.interface';
import { RentService } from '@services/rent.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { Observable } from 'rxjs';

@Component({
  selector: 'arriendoya-create-rent',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule, ButtonModule, InputNumberModule],
  templateUrl: './create-rent.component.html',
  styleUrl: './create-rent.component.scss'
})
export class CreateRentComponent {
  @Input({required: true}) property!: PropertyResponse

  rentForm: FormGroup

  today: Date
  minRentDay: Date 

  constructor(private formBuilder: FormBuilder, private rentS: RentService, private messageS: MessageService,
    private router: Router
  ){
    this.rentForm = this.formBuilder.group({
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      peopleQuantity: [1, Validators.required]
    })
    this.today = this.now()
    this.minRentDay = this.now()
  }

  now(): Date{
    return new Date()
  }
  updateMinRentDay(date: Date){
    this.minRentDay.setDate(date.getDate() + 2)
  }
  createRent(){
    const request = this.rentForm.value as RentSolicitudeRequest
    request.propertyId = this.property.id
    this.rentS.rent(request).subscribe({
      next: ()=>{
        this.messageS.add({
          severity: "success",
          summary: "Se ha creado la solicitud con éxito"
        })
        setTimeout(()=> this.router.navigate(["/home"]), 1000)
      },
      error: (err: HttpErrorResponse)=>{
        this.messageS.add({
          severity: "error",
          summary: "Ha ocurrido un error"
        })
      }
    })
  }
}
