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

  /*public libros: Response[] = [];
  
  public constructor(public service: BibliotecaService) {}
  
  public getResponse(): void {
    this.service.getResponse().subscribe((response) => {
    console.log(response);
  });
  }
  
  public ngOnInit(): void {
    this.getResponse();
  }*/

  public terminoBusqueda: string = '';
  public libros: Response[] = [];
  public paginaActual: number = 1;
  public librosPorPagina: number = 9;
  public paginas: number[] = [];

  constructor(private bibliotecaService: BibliotecaService, private router: Router) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
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

  public verDetalle(isbn: string): void {
    this.router.navigate(['/detalle', isbn]);
  }

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
