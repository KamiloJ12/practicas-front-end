import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  public items: MenuItem[] | undefined;
  public currrentUser = this.authService.currentUser();
  
  ngOnInit() {
    this.items = [
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-power-off',
          command: () => {
            this.authService.logout();
            this.router.navigateByUrl('/auth/login');
          }
        },
    ];
}
}
