import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RentSolicitudeResponse } from '@model/response/solicitude/solicitudeResponse.interface';
import { RentService } from '@services/rent.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'arriendoya-rent-request-landlord-control',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './rent-request-landlord-control.component.html',
  styleUrl: './rent-request-landlord-control.component.scss'
})
export class RentRequestLandlordControlComponent {
  @Input({required: true}) request!: RentSolicitudeResponse

  sureAccept = false
  sureReject = false

  constructor(private rentService: RentService, private messageService: MessageService){}

  setSureAccept(){
    this.sureAccept = true
    setTimeout(()=> this.sureAccept = false, 3000)
  }

  setSureReject(){
    this.sureReject = true
    setTimeout(()=> this.sureReject = false, 3000)
  }

  acceptRequest(){
    this.rentService.setRentStatus({id: this.request.id, status: 'ACCEPTED'})
    .subscribe({
      next: ()=>{
        this.messageService.add({
          severity:"success",
          summary: "Se ha aceptado la solicitud con éxito"
        })
        setTimeout(()=>window.location.reload(), 1500)
      },
      error: (err: HttpErrorResponse)=>{
        this.showErroDialog()
      }
    })
  }

  rejectRequest(){
    this.rentService.setRentStatus({id: this.request.id, status: 'REJECTED'})
    .subscribe({
      next: ()=>{
        this.messageService.add({
          severity:"success",
          summary: "Se ha rechazado la solicitud con éxito"
        })
        setTimeout(()=>window.location.reload(), 1500)        
      },
      error: (err: HttpErrorResponse)=>{
        this.showErroDialog()
      }
    })
  }

  finishRent(){
    // I assume that from PAID to QUALIFY status should pass the time of the request but it is just stupid
    // to wait al least 2 days 
    this.rentService.setRentStatus({id: this.request.id, status: 'TO_BE_QUALIFIED'})
    .subscribe({
      next: ()=>{
        this.messageService.add({
          severity:"success",
          summary: "Se ha terminado la solicitud con éxito"
        })
        setTimeout(()=>window.location.reload(), 1500)
      },
      error: (err: HttpErrorResponse)=>{
        this.showErroDialog()
      }
    })
  }

  private showErroDialog(){
    this.messageService.add({
      severity: "error",
      summary: "Ha ocurrido un error al procesar la solicitud de renta"
    })
  }
}
