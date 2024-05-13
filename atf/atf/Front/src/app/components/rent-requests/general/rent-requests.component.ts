import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserType } from '@model/request/auth/signUpRequest.interface';
import { AuthService } from '@services/auth.service';
import { environment } from '@environments/environment';
import { FrameComponent } from '@components/frame/frame.component';
import { RentSolicitudeResponse } from '@model/response/solicitude/solicitudeResponse.interface';
import { RentService } from '@services/rent.service';
import { RentSolicitudeStatus } from '@model/request/solicitude/rentSolicitudeSetStatusRequest.interface';
import { RentRequestLandlordControlComponent } from '@components/rent-requests/landlord/rent-request-landlord-control/rent-request-landlord-control.component';
import { RentRequestTenantControlComponent } from '@components/rent-requests/tenant/rent-request-tenant-control/rent-request-tenant-control.component';

@Component({
  selector: 'arriendoya-rent-requests',
  standalone: true,
  imports: [FrameComponent, CommonModule, ButtonModule, DialogModule, ToastModule,
    RentRequestLandlordControlComponent, RentRequestTenantControlComponent 
  ],
  templateUrl: './rent-requests.component.html',
  styleUrl: './rent-requests.component.scss',
  providers: [MessageService]
})
export class RentRequestsComponent {

  rentRequests$!: Observable<RentSolicitudeResponse[]>
  selectedRequest!: RentSolicitudeResponse

  constructor(private rentS: RentService, private auth: AuthService){
    this.rentRequests$ = this.rentS.getRentRequests()
  }

  getUserType(){
    return this.auth.userDetails?.type as UserType
  }


  getImageUrl(uuid: string){
    return `${environment.apiUrl}/files/${uuid}`
  }

  getStatus(status: RentSolicitudeStatus){
    switch(status){
      case 'TO_BE_ACCEPTED':{
        return "Por aceptar"
      }

      case 'ACCEPTED':{
        return "Aceptado, necesita pago"
      }

      case 'PAID':{
        return "Pagado"
      }

      case 'TO_BE_QUALIFIED':{
        return "Por calificar"
      }

      case 'FINALIZED':{
        return "Finalizado"
      }

      case 'REJECTED':{
        return "Rechazado"
      }
    }
  }

}
