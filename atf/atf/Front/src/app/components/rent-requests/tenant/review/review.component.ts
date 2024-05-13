import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RateRequest } from '../../../../model/request/rate/rateRequest.interface';
import { RentSolicitudeResponse } from '../../../../model/response/solicitude/solicitudeResponse.interface';
import { ReviewService } from '../../../../services/review.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'arriendoya-review',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, RatingModule, InputTextareaModule, ToastModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  reviewForm: FormGroup

  @Input({required: true})
  rentInfo!: RentSolicitudeResponse


  constructor(private formBuilder: FormBuilder, private reviewS: ReviewService, private messageS: MessageService){
    this.reviewForm =this.formBuilder.group({
      landlordRating: ['', [Validators.required]],
      propertyRating: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })
  }

  review(){
    const data = this.reviewForm.value as RateRequest
    data.rentSolicitudeId = this.rentInfo.id
    this.reviewS.review(data).subscribe({
      next:()=>{
        this.messageS.add({
          severity: "success",
          summary: "Se ha enviado tu opinión"
        })
        setTimeout(()=>window.location.reload(), 1500)
      },
      error: ()=>{
        this.messageS.add({
          severity: "error",
          summary: "Ha ocurrido un error al enviar la review"
        })
      }
    })
  }
}
