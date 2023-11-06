import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private authService = inject( AuthService );
  public user = this.authService.currentUser();

  public isMenuVisible = false;
  public items = [
    {    
      label: 'Cerrar sesion',
      icon: 'pi pi-sign-in',
      command: () => {
        this.logout();
      },
    },
  ];

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout() {
    this.authService.logout();
  }
}
