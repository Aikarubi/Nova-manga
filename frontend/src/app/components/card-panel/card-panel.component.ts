import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-panel',
  standalone: true,
  imports: [],
  templateUrl: './card-panel.component.html',
  styleUrl: './card-panel.component.css'
})
export class CardPanelComponent {

  @Input() tarjeta: string = 'Hola';

}
