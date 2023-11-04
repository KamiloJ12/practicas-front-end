import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject( AuthService );
  const router = inject( Router );
  console.log('isAuthenticatedGuard(url)= ' + state.url);
  if( authService.authStatus() === AuthStatus.authenticated ){
    return true;
  }
  localStorage.setItem('url', state.url);
  router.navigateByUrl('/auth/login');
  return false;
};
