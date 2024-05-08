import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-autor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-autor.component.html',
  styleUrl: './update-autor.component.css'
})
export class UpdateAutorComponent implements OnInit {

  public autorForm: FormGroup;

  constructor(private fb: FormBuilder, private bibliotecaService: BibliotecaService, private route: ActivatedRoute, private router: Router) { 
    //Inicialización del formulario usando FormBuilder
    this.autorForm = this.fb.group({});
   }

   ngOnInit(): void {
    // Configuración del formulario con validadores y valores iniciales
    this.autorForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });

    // Suscripción a cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      // Verifica que 'id' se esté extrayendo correctamente
      const id = params['id']; 
      console.log('ID del autor:', id);

      // Verifica que el 'id' se haya obtenido correctamente
      if (id) {
        this.bibliotecaService.obtenerAutor(id).subscribe(autor => {
          console.log('Datos del autor obtenidas:', autor);
          // Actualiza los valores del formulario con los datos obtenidos
          this.autorForm.patchValue({
            id: autor.id,
            nombre: autor.nombre
          });
        });
      }
    })
   }

   // Método para enviar el formulario al actualizar el autor
   onSubmit() {
    // Verifica si el formulario es válido
     if (this.autorForm.valid) {
       this.bibliotecaService.actualizarAutor(this.autorForm.value.id, this.autorForm.value).subscribe({
         next: (response) => {
           console.log('Autor actualizado:', response);
           this.router.navigate(['/panel-autores']);
         },
         error: (error) => {
           console.error('Error al actualizar el autor', error);
         }
       });
     }
   }
}
