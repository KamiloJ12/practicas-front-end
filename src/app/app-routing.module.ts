import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard, emailVerificationGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'coordinator',
    canActivate: [ isAuthenticatedGuard, emailVerificationGuard ],
    loadChildren: () => import('./coordinator/coordinator.module').then(m => m.CoordinatorModule),
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
  },
  {
    path: 'email-confirmation',
    loadChildren: () => import('./email-confirmation/email-confirmation.module').then(m => m.EmailConfirmationModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
