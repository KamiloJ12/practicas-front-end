import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject( AuthService );
  const router = inject( Router );
  
  if( authService.authStatus() === AuthStatus.authenticated ){ 
    console.log(false);
    router.navigateByUrl('/coordinator');
    return false;
  }

  const url = state.url;
  console.log( url );
  console.log(true);
  return true;
};
