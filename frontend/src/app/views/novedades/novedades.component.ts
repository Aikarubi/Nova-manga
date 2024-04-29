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
    this.obtenerNovedades();
    this.obtenerFechaActual();
  }

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

  obtenerFechaActual(): void {
    const meses: string[] = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const fecha = new Date();
    const mesActual = fecha.getMonth(); // Obtener el mes actual como un número (0-11)
    const añoActual = fecha.getFullYear(); // Obtener el año actual

    this.fechaActual = `${meses[mesActual]} ${añoActual}`;
  }

  public verDetalle(isbn: string): void {
    this.router.navigate(['/detalle', isbn]);
  }
}
