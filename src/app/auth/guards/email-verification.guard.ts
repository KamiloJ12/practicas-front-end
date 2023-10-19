import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const emailVerificationGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject( Router );
  
  if( authService.emailStatus() ){
    return true;
  }
  const user = authService.currentUser();
  authService.logout();
  router.navigateByUrl(`/auth/unverified-email?email=${user?.email}`);
  return false;
};
