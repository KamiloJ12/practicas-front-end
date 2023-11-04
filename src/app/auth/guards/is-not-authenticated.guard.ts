import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject( AuthService );
  const router = inject( Router );

  console.log('isNotAuthenticatedGuard(url)= ' + state.url);
  if( authService.authStatus() === AuthStatus.authenticated ){ 
    router.navigateByUrl('/coordinator');
    return false;
  }

  return true;
};
