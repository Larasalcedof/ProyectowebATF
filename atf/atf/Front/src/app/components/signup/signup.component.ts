import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { SignUpRequest } from '../../model/request/auth/signUpRequest.interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'arriendoya-signup',
  standalone: true,
  imports: [MessageModule, PasswordModule, ButtonModule, ReactiveFormsModule, InputTextModule, RouterModule,
    DropdownModule, ToastModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [MessageService]
})
export class SignupComponent {
  loading = false
  signinForm: FormGroup

  userType = [{display:"Arrendador", type: 'LANDLORD'}, {display:"Arrendatario", type: 'TENANT'}]

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private auth: AuthService, private router: Router) {
    if (this.auth.isLogged) {
      this.router.navigate(['/home'])
    }
    this.signinForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+\\s?[a-zA-Z]*$")]], //Un nombre o solo 2 nombres separados por un espacio
      surname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+\\s?[a-zA-Z]*$")]], //Lo mismo que arriba
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern("^\\d{10}$")]], // Num de colombia OK
      password: ['', [Validators.required, Validators.minLength(8)]],
      type: ['', Validators.required]
    });
  }

  signin() {
    this.auth.signUp(this.signinForm.value as SignUpRequest).subscribe({
      next: () => {
        this.router.navigate(["/home"])
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === HttpStatusCode.Conflict){
          this.messageService.add({
            severity: 'error',
            summary: 'El correo ya se encuentra registrado',
          })
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Ha ocurrido un error al registrarse',
          })
        }
      }
    })
  }

}
