import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-libro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-libro.component.html',
  styleUrl: './update-libro.component.css'
})
export class UpdateLibroComponent implements OnInit {

  public libroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    //icialización del formulario usando FormBuilder
    this.libroForm = this.fb.group({});
   }

   // Método para enviar el formulario al actualizar el libro
   ngOnInit(): void {
    this.libroForm = this.fb.group({
      isbn: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      descripcion: [''],
      tamanyo: [''],
      paginas: [''],
      portada: [''],
      fecha_venta: [''],
      editorial_id: [''],
      autor_id: ['']
    });
  
    // Suscripción a cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      // Verifica que 'isbn' se esté extrayendo correctamente
      const isbn = params['isbn'];
      console.log('ISBN del libro:', isbn);
  
      // Verifica que el 'isbn' se haya obtenido correctamente
      if (isbn) {
        this.bibliotecaService.obtenerLibro(isbn).subscribe(libro => {
          console.log('Datos del libro obtenidos:', libro);
          this.libroForm.patchValue({
            isbn: libro.isbn,
            nombre: libro.nombre,
            precio: libro.precio,
            descripcion: libro.descripcion,
            tamanyo: libro.tamanyo,
            paginas: libro.paginas,
            portada: libro.portada,
            fecha_venta: libro.fecha_venta,
            editorial_id: libro.editorial ? libro.editorial.id : null,
            autor_id: libro.autor ? libro.autor.id : null
          });
        });
      } else {
        console.error('ISBN no encontrado en los parámetros de la ruta');
      }
    });
  }
  
  // Método para enviar el formulario al actualizar el libro
  onSubmit(): void {
    if (this.libroForm.valid) {
      console.log('Datos del formulario:', this.libroForm.value);
      this.bibliotecaService.actualizarLibro(this.libroForm.value.isbn, this.libroForm.value).subscribe({
        next: (response) => {
          console.log('Libro actualizado', response);
          this.router.navigate(['/panel-libros']);
        },
        error: (error) => {
          console.error('Error al actualizar el libro', error);
        }
      });
    }
  }
}
