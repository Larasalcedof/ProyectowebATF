import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { RentSolicitudeResponse } from '@model/response/solicitude/solicitudeResponse.interface';
import { RentSolicitudePayRequest } from '@model/request/solicitude/rentSolicitudePayRequest.interface';
import { RentService } from '@services/rent.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'arriendoya-payment',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DropdownModule, InputNumberModule, CommonModule, ToastModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  readonly BANKS = ["BBVA", "BanColombia", "Nequi", "Davivienda", "Occidente"]
  @Input({required: true})
  rentInfo!: RentSolicitudeResponse

  payForm: FormGroup

  constructor(private formBuilder: FormBuilder, private rentS: RentService, private messageService: MessageService){
    this.payForm = this.formBuilder.group({
      bank: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]]
    })
  }

  pay(){
    const req: RentSolicitudePayRequest = {
      id: this.rentInfo?.id as number,
      bank: this.payForm.value["bank"]
    }
    this.rentS.pay(req).subscribe({
      next: ()=>{
        this.messageService.add({
          severity: "success",
          summary:"Se ha realizado el pago con éxito"
        })
        setTimeout(()=>window.location.reload(), 1500)
      },
      error: (err: HttpErrorResponse)=>{
        this.messageService.add({
          severity: "error",
          summary:"Ha ocurrido un error al momento del pago"
        })
      }
    })
  }
}
