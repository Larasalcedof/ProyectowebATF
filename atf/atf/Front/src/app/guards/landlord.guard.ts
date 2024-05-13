import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const landlordGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const auth = inject(AuthService)
  if(auth.userDetails?.type === "LANDLORD"){
    return true;
  }
  return router.navigate(["/home/"])
};
