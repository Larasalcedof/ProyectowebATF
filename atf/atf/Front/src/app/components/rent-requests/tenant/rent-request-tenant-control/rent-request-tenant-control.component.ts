import { Component, Input } from '@angular/core';
import { RentSolicitudeResponse } from '@model/response/solicitude/solicitudeResponse.interface';
import { ButtonModule } from 'primeng/button';
import { PaymentComponent } from '../payment/payment.component';
import { ReviewComponent } from '../review/review.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'arriendoya-rent-request-tenant-control',
  standalone: true,
  imports: [ButtonModule, PaymentComponent, ReviewComponent, DialogModule],
  templateUrl: './rent-request-tenant-control.component.html',
  styleUrl: './rent-request-tenant-control.component.scss',
  providers: [MessageService]
})
export class RentRequestTenantControlComponent {
  @Input({required: true}) request!: RentSolicitudeResponse

  payDialog = false
  reviewDialog = false

  showPayDialog(){
    this.payDialog = true
  }

  showReviewDialog(){
    this.reviewDialog = true
  }
}
