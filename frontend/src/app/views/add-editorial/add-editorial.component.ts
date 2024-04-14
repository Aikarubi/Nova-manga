import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-add-editorial',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-editorial.component.html',
  styleUrl: './add-editorial.component.css'
})
export class AddEditorialComponent implements OnInit {

  public editorialForm: FormGroup;

  constructor(private router: Router, private bibliotecaService: BibliotecaService) {
    this.editorialForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.editorialForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
    });
  }

  onSubmit() {
    this.bibliotecaService.agregarEditorial(this.editorialForm.value).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/panel-editoriales']);
      },
      error: (error) => {
        console.error('¡Hubo un error!', error);
      }
    });
  }
}
