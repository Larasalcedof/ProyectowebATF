import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropertyResponse } from '@model/response/property/propertyResponse.interface';
import { environment } from '@environments/environment';

@Component({
  selector: 'arriendoya-propertycard',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './propertycard.component.html',
  styleUrl: './propertycard.component.scss'
})
export class PropertycardComponent {
  @Input({required: true}) property!: PropertyResponse

  constructor(private router: Router){
  }

  seeDetails(id: number){
    this.router.navigate(["/property"], {queryParams: {id: this.property.id}})
  }

  get imageUrl(){
    return `${environment.apiUrl}/files/${this.property.img}`
  }
}
