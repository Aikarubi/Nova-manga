import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-editorial',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-editorial.component.html',
  styleUrl: './update-editorial.component.css'
})
export class UpdateEditorialComponent implements OnInit {

  public editorialForm: FormGroup;

  constructor(private fb: FormBuilder, private bibliotecaService: BibliotecaService, private route: ActivatedRoute, private router: Router) { 
    //icialización del formulario usando FormBuilder
    this.editorialForm = this.fb.group({});
   }

   ngOnInit(): void {
    // Configuración del formulario con validadores y valores iniciales
    this.editorialForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });

    // Suscripción a cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
       // Verifica que 'id' se esté extrayendo correctamente
      const id = params['id'];
      console.log('ID de la editorial:', id);

      // Verifica que el 'id' se haya obtenido correctamente
      if (id) {
        this.bibliotecaService.obtenerEditorial(id).subscribe(editorial => {
          console.log('Datos de la editorial obtenidas:', editorial);
          this.editorialForm.patchValue({
            id: editorial.id,
            nombre: editorial.nombre
          });
        });
      }
    })
   }

   // Método para enviar el formulario al actualizar la editorial
   onSubmit() {
     if (this.editorialForm.valid) {
       this.bibliotecaService.actualizarEditorial(this.editorialForm.value.id, this.editorialForm.value).subscribe({
         next: (response) => {
           console.log('Editorial actualizado:', response);
           this.router.navigate(['/panel-editoriales']);
         },
         error: (error) => {
           console.error('Error al actualizar la editorial', error);
         }
       });
     }
   }


}
