import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { FrameComponent } from '@components/frame/frame.component';
import { CreateRentComponent } from '@components/home/tenant/create-rent/create-rent.component';
import { PropertyDetailedResponse } from '@model/response/property/propertyResponse.interface';
import { PropertyService } from '@services/property.service';
import { PropertyIngressType } from '@model/request/property/propertyRequest.interface';
import { environment } from '@environments/environment';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { UserType } from '@model/request/auth/signUpRequest.interface';
import { PropertyLandlordControlComponent } from '../property-landlord-control/property-landlord-control.component';
import { PropertyTenantControlComponent } from '../property-tenant-control/property-tenant-control.component';

@Component({
  selector: 'arriendoya-propertydetails',
  standalone: true,
  imports: [FrameComponent, CommonModule, ButtonModule, DialogModule, CreateRentComponent, ToastModule,
    PropertyLandlordControlComponent, PropertyTenantControlComponent
  ],
  templateUrl: './propertydetails.component.html',
  styleUrl: './propertydetails.component.scss',
  providers: [MessageService]
})
export class PropertydetailsComponent implements OnInit {

  id: number = 0
  property$!: Observable<PropertyDetailedResponse>

  constructor(private route: ActivatedRoute, private propertyS: PropertyService,
     private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"]
      this.property$ = this.propertyS.getPropertyById(this.id).pipe(
        catchError((e: HttpErrorResponse) =>{
          if(e.status === HttpStatusCode.NotFound){
            this.router.navigate(["/e404"])
          }
          return throwError(()=> e)
        })
      )
    })
  }

  getIngress(ingress: PropertyIngressType) {
    switch(ingress){
      case "MUNICIPAL":{
        return "Municipio"
      }
      case "PRINCIPAL_STREET":{
        return "Primera carrera"
      }
      case "SECONDARY_STREET":{
        return "Segunda carrera"
      }
      case "TERTIARY_STREET":{
        return "Tercera carrera"
      }
    }
  }

  getImageUrl(uuid: string){
    return `${environment.apiUrl}/files/${uuid}`
  }

  getUserType(){
    return this.auth.userDetails?.type as UserType
  }

}
