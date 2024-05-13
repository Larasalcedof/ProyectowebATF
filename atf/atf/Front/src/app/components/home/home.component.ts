import { Component } from '@angular/core';
import { UserType } from '@model/request/auth/signUpRequest.interface';
import { AuthService } from '@services/auth.service';
import { HomeTenantComponent } from './tenant/home-tenant.component';
import { HomeLandlordComponent } from '@components/home/landlord/home-landlord.component';

@Component({
  selector: 'arriendoya-home',
  standalone: true,
  imports: [HomeTenantComponent, HomeLandlordComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userType: UserType
  constructor(private auth: AuthService){
    this.userType = this.auth.userDetails?.type as UserType
  }
}
