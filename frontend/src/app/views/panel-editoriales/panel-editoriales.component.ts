import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-panel-editoriales',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './panel-editoriales.component.html',
  styleUrl: './panel-editoriales.component.css'
})
export class PanelEditorialesComponent implements OnInit {

  public editoriales: any[] = [];
  public paginaActual: number = 1;
  public editorialesPorPagina: number = 8;
  public paginas: number[] = [];

  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.obtenerEditoriales();
  }

  obtenerEditoriales(): void {
    this.bibliotecaService.getEditoriales().subscribe(editoriales => {
      this.editoriales = editoriales;
      this.calcularPaginas();
    });
  }

  calcularPaginas(): void {
    const totalPaginas = Math.ceil(this.editoriales.length / this.editorialesPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
  }

  getEditorialesPaginadas(): any[] {
    const indiceicial = (this.paginaActual - 1) * this.editorialesPorPagina;
    const indiceFinal = Math.min(indiceicial + this.editorialesPorPagina, this.editoriales.length);
    return this.editoriales.slice(indiceicial, indiceFinal);
  }

  public eliminarEditorial(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta editorial?')) {
      this.bibliotecaService.eliminarEditorial(id).subscribe({
        next: (response) => {
          console.log('Editorial eliminada:', response);
          // Realiza acciones adicionales aquí de eliminar la editorial, como actualizar la lista de editoriales
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar la editorial:', error);
          // Maneja errores de eliminación de editoriales, como mostrar un mensaje de error al usuario
        }
      });
    }
  }
}
