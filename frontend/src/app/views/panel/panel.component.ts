import { Component } from '@angular/core';
import { CardPanelComponent } from '../../components/card-panel/card-panel.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CardPanelComponent, RouterLink, RouterLinkActive],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  public tarjetas = [
    { texto: "Administrar Libros", ruta: "/panel-libros" },
    { texto: "Administrar Autores", ruta: "/panel-autores" },
    { texto: "Administrar Editoriales", ruta: "/panel-editoriales"}
  ];
}
