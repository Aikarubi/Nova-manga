import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-panel-libros',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel-libros.component.html',
  styleUrl: './panel-libros.component.css'
})
export class PanelLibrosComponent {

}
