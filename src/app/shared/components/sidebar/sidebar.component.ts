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
          label: 'Estudiante',
          icon: 'pi-user'
        },
        {
          label: 'Reportes',
          icon: 'pi-chart-line',
          items: [
            {
              label: 'Estudiante',
              icon: 'pi-user'
            },
          ]
        }
      ]
    },
    {
      label: 'Aplicacion',
      items: [
        {
          label: 'Paises',
          link: '/coordinator/countries',
          icon: 'pi-user'
        },
        {
          label: 'Reportes',
          icon: 'pi-chart-line',
          items: [
            {
              label: 'Paises',
              icon: 'pi-user',
              link: '/coordinator/countries',
            },
          ]
        }
      ]
    }
  ];

}
