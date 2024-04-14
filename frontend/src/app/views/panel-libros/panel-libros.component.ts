import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-panel-libros',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel-libros.component.html',
  styleUrl: './panel-libros.component.css'
})
export class PanelLibrosComponent implements OnInit{

  public libros: any[] = [];
  public paginaActual: number = 1;
  public librosPorPagina: number = 8;
  public paginas: number[] = [];

  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(): void {
    this.bibliotecaService.getLibros().subscribe(libros => {
      this.libros = libros;
      this.calcularPaginas();
    });
  }

  calcularPaginas(): void {
    const totalPaginas = Math.ceil(this.libros.length / this.librosPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }
  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }

  getLibrosPaginados(): any[] {
    const indiceInicial = (this.paginaActual - 1) * this.librosPorPagina;
    const indiceFinal = Math.min(indiceInicial + this.librosPorPagina, this.libros.length);
    return this.libros.slice(indiceInicial, indiceFinal);
  }
  
  public eliminarLibro(isbn: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.bibliotecaService.eliminarLibro(isbn).subscribe({
        next: (response) => {
          console.log('Libro eliminado:', response);
          // Realiza acciones adicionales después de eliminar el libro, como actualizar la lista de libros
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar el libro:', error);
          // Maneja errores de eliminación de libros, como mostrar un mensaje de error al usuario
        }
      });
    }
  }
  

}
