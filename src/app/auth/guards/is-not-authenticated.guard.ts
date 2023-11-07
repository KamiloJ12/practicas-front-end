import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject( AuthService );
  const router = inject( Router );

  console.log('isNotAuthenticatedGuard(url)= ' + state.url);
  if( authService.authStatus() === AuthStatus.authenticated ){ 
    const user = authService.currentUser();
    switch(user?.role) {
      case 'Coordinator': {
        router.navigateByUrl('/coordinator/');
        break;
      }
      case 'Student': {
        router.navigateByUrl('/student/');
        break;
      }
      case 'Company': {
        router.navigateByUrl('/company/');
        break;
      }
      case 'Tutor': {
        router.navigateByUrl('/tutor/');
        break;
      }
    }
    return false;
  }

  return true;
};
