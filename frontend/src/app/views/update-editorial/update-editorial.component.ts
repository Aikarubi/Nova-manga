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
    this.editorialForm = this.fb.group({});
   }

   ngOnInit(): void {
    this.editorialForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      const id = params['id']; // Verifica que 'id' se esté extrayendo correctamente
      console.log('ID de la editorial:', id);

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
