import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );

  studentsListVisible = true;
  studentsListAnimationSlidedown = true;

  ngOnInit(): void { }

  toggleEstudiantesList() {
    this.studentsListAnimationSlidedown = !this.studentsListAnimationSlidedown;
    if( !this.studentsListVisible ) {
      this.studentsListVisible = true;
    }
  }

  onAnimationDone() {
    if( this.studentsListVisible && this.studentsListAnimationSlidedown ) {
      this.studentsListVisible = false;
    }
  }

  items = [
    {
        label: 'Options',
        items: [
            {
                label: 'Cerrar sesion',
                icon: 'pi pi-refresh',
                command: () => {
                  this.logout();
                    //this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    //this.delete();
                }
            }
        ]
    },
    {
        label: 'Navigate',
        items: [
            {
                label: 'Angular',
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                routerLink: '/fileupload'
            }
        ]
    }
  ];

  logout() {
    this.authService.logout();
  }

}
