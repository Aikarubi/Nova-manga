import { Component } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private bibliotecaService: BibliotecaService, private router: Router) { }



  public verDetalle(isbn: string): void {
    this.router.navigate(['/detalle', isbn]);
  }
}
