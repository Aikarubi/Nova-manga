import { Component } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
public constructor(public service: BibliotecaService) {}

public getResponse(): void {
  this.service.getResponse().subscribe((response) => {
  console.log(response);
});
}

public ngOnInit(): void {
  this.getResponse();
}
}
