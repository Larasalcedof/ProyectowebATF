import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyResponse } from '@model/response/property/propertyResponse.interface';
import { Department, GeoService } from '@services/geo.service';
import { PropertyService } from '@services/property.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PropertyUpdateRequest } from '@model/request/property/propertyUpdateRequest.interface';

@Component({
  selector: 'arriendoya-create-property',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, DropdownModule, 
    InputTextareaModule, InputNumberModule, ToggleButtonModule, FileUploadModule
  ],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.scss'
})
export class CreatePropertyComponent implements OnInit {
  @Input() oldProperty: PropertyResponse | null = null

  propertyForm: FormGroup

  departMents: Department[] = []
  cities: string[] = []
  ingressType = [
    { type: "MUNICIPAL", display: 'En el municipio' },
    { type: "PRINCIPAL_STREET", display: 'Carretera principal' },
    { type: "SECONDARY_STREET", display: 'Carretera secundiaria' },
    { type: "TERTIARY_STREET", display: 'Carretera terciaria' },
  ]

  image: File | null = null

  constructor(private propertyService: PropertyService, private formBuilder: FormBuilder,
    private geoService: GeoService, private messageS: MessageService, private router: Router) {
    this.propertyForm = this.formBuilder.group({
      name: ["", Validators.required],
      department: ["", Validators.required],
      city: ["", Validators.required],
      ingressType: ["", Validators.required],
      description: ["", Validators.required],
      peopleQuantity: ["", Validators.required],
      bathRoomQuantity: ["", Validators.required],
      arePetsAllowed: [false, Validators.required],
      hasPool: [false, Validators.required],
      hasBBQ: [false, Validators.required],
      price: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.getDptosAndCities()
    if(this.oldProperty !== null){
      this.propertyForm.patchValue(this.oldProperty)
      this.propertyForm.get("department")?.setValue(null)
      this.propertyForm.get("city")?.setValue(null)
    }
  }

  private getDptosAndCities() {
    this.geoService.getDepartments().subscribe({
      next: (dptos: Department[]) => {
        this.departMents = dptos
      }
    })
  }

  getCities(event: DropdownChangeEvent) {
    const id = this.departMents.find((dpto)=> dpto.name === event.value)?.id
    this.geoService.getCitiesByDepartmentId(id as number)
      .subscribe({
        next: (s: string[]) => {
          this.propertyForm.get("city")?.setValue(null)
          this.cities = s
        }
      })
  }

  createProperty(){
    this.propertyService.createProperty(this.propertyForm.value, this.image as File).subscribe({
      next: ()=>{
        this.messageS.add({
          severity: 'success',
          summary: "Se ha creado exitosamente la propiedad"
        })
        setTimeout(()=>window.location.reload(), 1000)
      },
      error: (err: HttpErrorResponse)=>{
        this.messageS.add({
          severity: 'error',
          summary: "Ha ocurrido un problema creando la propiedad"
        })
      }
    })
  }
  updateProperty(){
    const request: PropertyUpdateRequest = this.propertyForm.value
    request.id = this.oldProperty?.id as number
    this.propertyService.updateProperty(request).subscribe({
      next: ()=>{
        this.messageS.add({
          severity: 'success',
          summary: "Se ha editado exitosamente la propiedad"
        })
        setTimeout(()=>window.location.reload(), 1000)
      },
      error: (err: HttpErrorResponse)=>{
        this.messageS.add({
          severity: 'error',
          summary: "Ha ocurrido un problema creando la propiedad"
        })
      }
    })
  }

  submit(){
    if(this.oldProperty === null){
      this.createProperty()
    }else{
      this.updateProperty()
    }
  }

  selectFile($event: FileSelectEvent,_t83: FileUpload) {
    this.image = $event.files[0]
  }

  createOrUpdate(): boolean{
    if(this.oldProperty === null){
      return this.image ===null
    }else{
      return false
    }
  }
}
