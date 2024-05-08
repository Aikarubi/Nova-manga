import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { Response } from '../../interfaces/response';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  public terminoBusqueda: string = '';
  public libros: Response[] = [];
  public paginaActual: number = 1;
  public librosPorPagina: number = 9;
  public paginas: number[] = [];

  constructor(private bibliotecaService: BibliotecaService, private router: Router) { }

  ngOnInit(): void {
    // Al inicializarse el componente, se recuperan los libros
    this.getLibros();
  }

  // Método para obtener todos los libros
  getLibros(): void {
    this.bibliotecaService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.calcularPaginas();
    });
  }

  // Método para calcular el número de páginas
  calcularPaginas(): void {
    const totalPaginas = Math.ceil(this.libros.length / this.librosPorPagina);
    // Se crea un array con las páginas disponibles
    this.paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  // Método para cambiar a una página específica
  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }

  // Método para obtener los libros de la página actual
  getLibrosPaginados(): any[] {
    const indiceInicial = (this.paginaActual - 1) * this.librosPorPagina;
    const indiceFinal = Math.min(indiceInicial + this.librosPorPagina, this.libros.length);
    return this.libros.slice(indiceInicial, indiceFinal);
  }

  // Método para ver el detalle de un libro
  public verDetalle(isbn: string): void {
    this.router.navigate(['/detalle', isbn]);
  }

  // Método para buscar libros por término de búsqueda
  buscarLibros(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.bibliotecaService.buscarLibros(this.terminoBusqueda).subscribe(
        (response: any) => {
          this.libros = response;
        },
        (error: any) => {
          console.error('Error al buscar libros:', error);
          this.libros = [];
        }
      );
    } else {
      this.libros = [];
    }
  }

}
