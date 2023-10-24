import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-coordinator-layout',
  templateUrl: './coordinator-layout.component.html',
  styleUrls: ['./coordinator-layout.component.css']
})
export class CoordinatorLayoutComponent {

  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );

  items = [
    {    
      label: 'Cerrar sesion',
      icon: 'pi pi-refresh',
      command: () => {
        this.logout();
          //this.update();
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
          //this.delete();
      }   
    }
  ];

  logout() {
    this.authService.logout();
  }
}
