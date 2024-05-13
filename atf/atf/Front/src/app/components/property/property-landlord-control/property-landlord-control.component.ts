import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CreatePropertyComponent } from '@components/home/landlord/create-property/create-property.component';
import { PropertyDetailedResponse } from '@model/response/property/propertyResponse.interface';
import { PropertyService } from '@services/property.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'arriendoya-property-landlord-control',
    standalone: true,
    templateUrl: './property-landlord-control.component.html',
    styleUrl: './property-landlord-control.component.scss',
    providers: [MessageService],
    imports: [ButtonModule, DialogModule, CreatePropertyComponent]
})
export class PropertyLandlordControlComponent {

  @Input({required: true}) property!: PropertyDetailedResponse

  showEditDialog= false
  sure = false

  constructor(private propertyService: PropertyService, private messageService: MessageService,
    private router:Router
  ){}

  disableProperty(){
    this.propertyService.disableProperty({id: this.property.id}).subscribe({
      next:()=>{
        this.messageService.add({
          severity: 'success',
          summary: "Se ha desactivado la propiedad con éxito"
        })
        setTimeout(()=> this.router.navigate(["/home"]), 1500)
      },error: (e: HttpErrorResponse)=>{
        this.messageService.add({
          severity: 'error',
          summary: "Ha ocurrido un error al intentar desactivar la propiedad"
        })
      }
    })
  }

  setShowEditDialog(){
    this.showEditDialog = true
  }

  setSure() {
    this.sure = true
  }
}
