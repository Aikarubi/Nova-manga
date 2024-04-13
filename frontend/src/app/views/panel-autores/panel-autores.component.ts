import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-panel-autores',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel-autores.component.html',
  styleUrl: './panel-autores.component.css'
})
export class PanelAutoresComponent {

}
