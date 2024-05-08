import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  public libro: any;

  constructor(private bibliotecaService: BibliotecaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtener el ISBN del libro de los parámetros de la URL
    const isbn = this.route.snapshot.paramMap.get('isbn');
    // Verificar si isbn no es nulo antes de usarlo
    if (isbn !== null) {
      // Llamar al método del servicio para obtener los detalles del libro
      this.bibliotecaService.obtenerLibro(isbn).subscribe(
        (data) => {
          this.libro = data;
        },
        (error) => {
          console.error('Error al obtener los detalles del libro:', error);
        }
      );
    } else {
      console.error('ISBN no encontrado en la URL.');
    }
  }

}
