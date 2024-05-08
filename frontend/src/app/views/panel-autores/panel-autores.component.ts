import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-panel-autores',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel-autores.component.html',
  styleUrl: './panel-autores.component.css'
})
export class PanelAutoresComponent implements OnInit {

  public autores: any[] = [];
  public paginaActual: number = 1;
  public autoresPorPagina: number = 8;
  public paginas: number[] = [];

  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    // Al inicializarse el componente, se obtienen los autores
    this.obtenerAutores();
  }

  // Método para obtener los autores
  obtenerAutores(): void {
    this.bibliotecaService.getAutores().subscribe(autores => {
      this.autores = autores;
      this.calcularPaginas();
    });
  }

  // Método para calcular el número de páginas
  calcularPaginas(): void {
    const totalPaginas = Math.ceil(this.autores.length / this.autoresPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }
  
  // Método para cambiar a una página específica
  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }

  // Método para obtener los autores de la página actual
  getAutoresPaginados(): any[] {
    const indiceInicial = (this.paginaActual - 1) * this.autoresPorPagina;
    const indiceFinal = Math.min(indiceInicial + this.autoresPorPagina, this.autores.length);
    return this.autores.slice(indiceInicial, indiceFinal);
  }

  // Método para eliminar un autor
  public eliminarAutor(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este autor?')) {
      this.bibliotecaService.eliminarAutor(id).subscribe({
        next: (response) => {
          console.log('Autor eliminado:', response);
          // Realiza acciones adicionales aquí de eliminar el autor, como actualizar la lista de autores
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar el autor:', error);
          // Maneja errores de eliminación de autores, como mostrar un mensaje de error al usuario
        }
      });
    }
  }
}
