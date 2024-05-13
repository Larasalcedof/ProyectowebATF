import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'arriendoya-activate-account',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  constructor(private auth: AuthService, private router: Router){}


  activateAccount(){
    this.auth.activateAccount().subscribe({
      next:()=> this.router.navigate(["/home"]),
      error: (e: HttpErrorResponse)=>{
        console.error(e)
      }
    })
  }
}
