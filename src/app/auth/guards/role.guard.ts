import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject( Router );

  const requiredRole = route.data['role'];
  console.log('roleGuard(url)= ' + state.url + ' (role)= ' + requiredRole);
  if( authService.checkUserRole(requiredRole) ){
    return true;
  }
  /* const url = localStorage.getItem('url');
  if(url) {
    router.navigateByUrl(url);
  } else {
    router.navigateByUrl('auth/login');
  } */
  return false;
};
