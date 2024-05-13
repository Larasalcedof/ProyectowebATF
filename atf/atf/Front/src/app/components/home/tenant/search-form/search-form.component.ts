import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Observable } from 'rxjs';
import { SearchRequest } from '../../../../model/request/search/searchRequest.interface';
import { PropertyResponse } from '../../../../model/response/property/propertyResponse.interface';
import { SearchPropertyService } from '../../../../services/search-property.service';

@Component({
  selector: 'arriendoya-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {

  loading = false
  searchForm: FormGroup

  @Output() searchResult = new EventEmitter<Observable<PropertyResponse[]>>

  constructor(private searchPropertyS: SearchPropertyService, private formBuilder: FormBuilder){
    this.searchForm = this.formBuilder.group({
      name: [null, []],
      city: [null, []],
      peopleQuantity: [null, []]
    });
  }
  search(){
    if(this.searchForm.get("name")?.value === ""){
      this.searchForm.get("name")?.setValue(null)
    }
    if(this.searchForm.get("city")?.value === ""){
      this.searchForm.get("city")?.setValue(null)
    }
    this.searchResult.emit(this.searchPropertyS.search(this.searchForm.value as SearchRequest))
  }
}
