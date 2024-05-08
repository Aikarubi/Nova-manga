import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent {

  public novedades: any[] = [];
  public fechaActual: string = '';

  constructor(private bibliotecaService: BibliotecaService, private router: Router) { }

  ngOnInit(): void {
    // Al inicializarse el componente, se obtienen las novedades y la fecha actual
    this.obtenerNovedades();
    this.obtenerFechaActual();
  }

  // Método para obtener las novedades
  obtenerNovedades(): void {
    this.bibliotecaService.getNovedades()
      .subscribe(
        response => {
          this.novedades = response.novedades;
        },
        error => {
          console.error('Error al obtener las novedades:', error);
        }
      );
  }

  // Método para obtener la fecha actual
  obtenerFechaActual(): void {
    const meses: string[] = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const fecha = new Date();
    const mesActual = fecha.getMonth();
    const añoActual = fecha.getFullYear();

    // Construir la cadena de la fecha actual
    this.fechaActual = `${meses[mesActual]} ${añoActual}`;
  }

  // Método para ver el detalle de un libro
  public verDetalle(isbn: string): void {
    this.router.navigate(['/detalle', isbn]);
  }
}
