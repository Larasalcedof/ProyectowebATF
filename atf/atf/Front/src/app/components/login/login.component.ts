import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password'
import { ToastModule } from 'primeng/toast'
import { MessageModule } from 'primeng/message';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../model/request/auth/loginRequest.interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'arriendoya-login',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ToastModule, MessageModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  loading = false
  loginForm: FormGroup
  router = inject(Router)

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
    private authS: AuthService) {

    if (this.authS.isLogged) {
      this.router.navigate(['/home'])
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    
  }

  login() {
    this.authS.login(this.loginForm.value as LoginRequest)
      .subscribe({
        next: () => {
          this.router.navigate(["/home"])
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Forbidden) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error, usuario o contraseña incorrecto',
            })
          }
        }
      })
  }

}
