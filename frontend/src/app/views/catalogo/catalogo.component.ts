import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { Response } from '../../interfaces/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [],
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


  
}
