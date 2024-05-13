import { Component, Input } from '@angular/core';
import { CreateRentComponent } from '@components/home/tenant/create-rent/create-rent.component';
import { PropertyResponse } from '@model/response/property/propertyResponse.interface';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'arriendoya-property-tenant-control',
  standalone: true,
  imports: [ButtonModule, DialogModule, CreateRentComponent],
  templateUrl: './property-tenant-control.component.html',
  styleUrl: './property-tenant-control.component.scss'
})
export class PropertyTenantControlComponent {
  @Input({ required: true })
  property!: PropertyResponse;
  
  rentDialog = false

  showRentDialog(){
    this.rentDialog = true
  }
}
