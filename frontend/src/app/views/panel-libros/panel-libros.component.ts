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
  
  

}
