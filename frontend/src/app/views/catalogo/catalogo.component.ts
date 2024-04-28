import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { Response } from '../../interfaces/response';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ FormsModule],
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

  terminoBusqueda: string = '';
  libros: Response[] = [];

  constructor(private bibliotecaService: BibliotecaService, private router: Router) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.bibliotecaService.getLibros()
      .subscribe(libros => this.libros = libros);
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
