import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { concat } from 'rxjs';
import { UserType } from '../../../model/request/auth/signUpRequest.interface';

@Component({
  selector: 'arriendoya-header',
  standalone: true,
  imports: [RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userType: UserType

  constructor(private auth: AuthService, private router: Router){
    this.userType = this.auth.userDetails?.type as UserType
  }
  logout(){
    this.auth.logout().subscribe({
      next: ()=>{
        this.router.navigate(["/login"])
      }
    }
    )
  }

  getUserType(){
    return this.auth.userDetails?.type as UserType
  }
}
