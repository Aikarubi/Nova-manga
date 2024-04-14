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
    this.autorForm = this.fb.group({});
   }

   ngOnInit(): void {
    this.autorForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      const id = params['id']; // Verifica que 'id' se esté extrayendo correctamente
      console.log('ID del autor:', id);


      if (id) {
        this.bibliotecaService.obtenerAutor(id).subscribe(autor => {
          console.log('Datos del autor obtenidas:', autor);
          this.autorForm.patchValue({
            id: autor.id,
            nombre: autor.nombre
          });
        });
      }
    })
   }

   onSubmit() {
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
