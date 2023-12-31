import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { esJson } from 'src/assets/json/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    if( this.authService.authStatus() == AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  constructor(private config: PrimeNGConfig) { }

  public ngOnInit() {
    this.config.setTranslation(esJson);
  }

  public authStatusChangedEffect = effect(() => {
    switch( this.authService.authStatus() ) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        const url = localStorage.getItem('url') ?? '/auth/login';
        return this.router.navigateByUrl(url);
      case AuthStatus.notAuthenticated:
        return this.router.navigateByUrl('/auth/login');
    }
  });
}
