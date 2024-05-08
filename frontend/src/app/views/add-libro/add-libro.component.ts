import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-libro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-libro.component.html',
  styleUrl: './add-libro.component.css'
})
export class AddLibroComponent implements OnInit {


  public libroForm: FormGroup;

  constructor(private bibliotecaService: BibliotecaService, private router: Router) { 
    // Inicialización del formulario libroForm en el constructor del componente
    this.libroForm = new FormGroup({});
  }

  ngOnInit(): void {
    // En el evento OnInit, se crea el formulario con sus campos y validaciones
    this.libroForm = new FormGroup({
      isbn: new FormControl(''),
      nombre: new FormControl(''),
      precio: new FormControl(''),
      descripcion: new FormControl(''),
      tamanyo: new FormControl(''),
      paginas: new FormControl(''),
      fecha_venta: new FormControl(''),
      editorial_id: new FormControl(''),
      autor_id: new FormControl(''),
      portada: new FormControl(''),
    })
  }

  // Método invocado al enviar el formulario
  onSubmit() {
    console.log('Datos del formulario:', this.libroForm.value);
    
    this.bibliotecaService.agregarLibro(this.libroForm.value).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/panel-libros']);
      },
      error: (error) => {
        console.error('¡Hubo un error!', error);
      }
    });
  }
  

}