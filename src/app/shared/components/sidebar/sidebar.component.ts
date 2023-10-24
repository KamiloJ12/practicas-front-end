import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  
})
export class SidebarComponent {

  //@Input() items = [];

  items = [
    {
      label: 'Estudiantes',
      items: [
        {
          label: 'Estudiantes',
          icon: 'pi-user',
          link: '/coordinator/students',
        },
        {
          label: 'Reportes',
          icon: 'pi-chart-line',
          items: [
            {
              label: 'Estudiantes',
              icon: 'pi-user'
            },
          ]
        }
      ]
    },
    {
      label: 'Aplicacion',
    }
  ];

}
