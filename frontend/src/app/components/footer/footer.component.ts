import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SobreNosotrosComponent } from '../../views/sobre-nosotros/sobre-nosotros.component';
import { PoliticaPrivacidadComponent } from '../../views/politica-privacidad/politica-privacidad.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SobreNosotrosComponent, PoliticaPrivacidadComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
