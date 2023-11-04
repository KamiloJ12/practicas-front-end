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
  return false;
};
