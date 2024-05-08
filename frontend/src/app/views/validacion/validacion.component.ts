import { Component } from '@angular/core';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-validacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './validacion.component.html',
  styleUrl: './validacion.component.css'
})
export class ValidacionComponent {

  public clave: string = '';
  public error: string = '';

  constructor(private bibliotecaService: BibliotecaService, private router: Router) {}

  // Método para verificar el acceso
  verificarAcceso(): void {
    this.bibliotecaService.verificarAcceso(this.clave)
      .subscribe(
        response => {
          if (response.accesoValido) {
            // Redirigir al panel administrador si la clave es válida
            this.router.navigate(['/panel']);
          } else {
            // Mostrar un mensaje de error si la clave es incorrecta
            this.error = 'Clave incorrecta';
          }
        },
        error => {
          console.error('Error al verificar el acceso:', error);
          this.error = 'Error al verificar el acceso';
        }
      );
  }

}
