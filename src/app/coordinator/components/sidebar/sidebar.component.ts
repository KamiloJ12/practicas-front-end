import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  
})
export class SidebarComponent {

  items = [
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
  ];
}
