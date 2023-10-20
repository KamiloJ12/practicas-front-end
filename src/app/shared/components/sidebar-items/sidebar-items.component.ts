import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-items',
  templateUrl: './sidebar-items.component.html',
  styleUrls: ['./sidebar-items.component.css'],
  animations: [
    trigger('entradaSalidaAnimation', [
      transition('slidedown => slideup', [
        style({ height: '0', opacity: 0 }),
        animate('0.5s ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      transition('slideup => slidedown', [
        style({ height: '*', opacity: 1 }),
        animate('0.5s ease-in-out', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarItemsComponent {

  @Input({ required: true }) label!: string;
  @Input() items?: any;
  
  listVisible = true;
  listAnimationSlidedown = false;

  toggleList() {
    this.listAnimationSlidedown = !this.listAnimationSlidedown;
    if( !this.listVisible ) {
      this.listVisible = true;
    }
  }

  onAnimationDone() {
    if( this.listVisible && this.listAnimationSlidedown ) {
      this.listVisible = false;
    }
  }
}
