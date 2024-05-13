import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if(auth.isLogged){
    if(auth.userDetails?.enabled === false){
      return router.parseUrl("/activate")
    }
    return true
  }
  return router.parseUrl("/login")
};
