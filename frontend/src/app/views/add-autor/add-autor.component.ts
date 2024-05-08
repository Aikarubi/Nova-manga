import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-add-autor',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-autor.component.html',
  styleUrl: './add-autor.component.css'
})
export class AddAutorComponent implements OnInit {

  public autorForm: FormGroup;

  constructor(private router: Router, private bibliotecaService: BibliotecaService) {
    // Inicialización del formulario autorForm en el constructor del componente
    this.autorForm = new FormGroup({});
  }

  ngOnInit(): void {
    // En el evento OnInit, se crea el formulario con sus campos y validaciones
    this.autorForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
    });
  }

  onSubmit() {
     // Se llama al método agregarAutor del servicio BibliotecaService y se suscribe a la respuesta
    this.bibliotecaService.agregarAutor(this.autorForm.value).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/panel-autores']);
      },
      // Manejo de errores
      error: (error) => {
        console.error('¡Hubo un error!', error);
      }
    });
  }
}
