import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

    //URL de la API del backend
    private urlAPI: string = 'http://localhost:8000/';

    constructor(public http: HttpClient) { }
  
    //-------------LIBROS-------------

    //Obtener todos los libros
    public getLibros(): Observable<Response[]> {
      const urlGetAllLibros: string = `${this.urlAPI}libros`; 
    
      return this.http.get<Response[]>(urlGetAllLibros);
    }

    //Crear un libro
    public agregarLibro(libroData: any): Observable<any> {
      const urlInsertLibro: string = `${this.urlAPI}insert/libros`; 
    
      return this.http.post<any>(urlInsertLibro, libroData);
    }

    //Actualizar un libro
    public actualizarLibro(isbn: string, datosLibro: any): Observable<any> {
      const urlActualizarLibro: string = `${this.urlAPI}update/libros/${isbn}`; 
      return this.http.put(urlActualizarLibro, datosLibro);
    }

    //Obtener un libro
    public obtenerLibro(isbn: string): Observable<any> {
      const urlObtenerLibro: string = `${this.urlAPI}libros/${isbn}`;
      return this.http.get<any>(urlObtenerLibro);
    }

    //Eliminar un libro
    public eliminarLibro(isbn: string): Observable<any> {
      const urlEliminarLibro: string = `${this.urlAPI}delete/libros/${isbn}`;
      return this.http.delete(urlEliminarLibro);
    }

    //-------------AUTORES-------------

    //Obtener todos los autores
    public getAutores(): Observable<Response[]> {
      const urlGetAllAutores: string = `${this.urlAPI}autor`;
      return this.http.get<Response[]>(urlGetAllAutores);
    }

    //Crear un autor
    public agregarAutor(autorData: any): Observable<any> {
      const urlInsertAutor: string = `${this.urlAPI}insert/autores`; 
    
      return this.http.post<any>(urlInsertAutor, autorData);
    }

    //Actualizar un autor
    public actualizarAutor(id: number, datosAutor: any): Observable<any> {
      const urlActualizarAutor: string = `${this.urlAPI}update/autores/${id}`; 
      return this.http.put(urlActualizarAutor, datosAutor);
    }

    //Obtener un autor
    public obtenerAutor(id: number): Observable<any> {
      const urlObtenerAutor: string = `${this.urlAPI}autores/${id}`;
      return this.http.get<any>(urlObtenerAutor);
    }

    //Eliminar un autor
    public eliminarAutor(id: number): Observable<any> {
      const urlEliminarAutor: string = `${this.urlAPI}delete/autores/${id}`;
      return this.http.delete(urlEliminarAutor);
    }

    //-------------EDITORIALES-------------

    //Obtener todas las editoriales
    public getEditoriales(): Observable<Response[]> {
      const urlGetAllEditoriales: string = `${this.urlAPI}editorial`;
      return this.http.get<Response[]>(urlGetAllEditoriales);
    }

    //Crear una editorial
    public agregarEditorial(editorialData: any): Observable<any> {
      const urlInsertEditorial: string = `${this.urlAPI}insert/editoriales`; 
    
      return this.http.post<any>(urlInsertEditorial, editorialData);
    }

    //Actualizar una editorial
    public actualizarEditorial(id: number, datosEditorial: any): Observable<any> {
      const urlActualizarEditorial: string = `${this.urlAPI}update/editoriales/${id}`; 
      return this.http.put(urlActualizarEditorial, datosEditorial);
    }

    //Obtener una editorial
    public obtenerEditorial(id: number): Observable<any> {
      const urlObtenerEditorial: string = `${this.urlAPI}editoriales/${id}`;
      return this.http.get<any>(urlObtenerEditorial);
    }

    //Eliminar una editorial
    public eliminarEditorial(id: number): Observable<any> {
      const urlEliminarEditorial: string = `${this.urlAPI}delete/editoriales/${id}`;
      return this.http.delete(urlEliminarEditorial);
    }

    //-------------SEARCH-------------

    //Buscar libros
    public buscarLibros(termino: string): Observable<any> {
      const urlBuscarLibros: string = `${this.urlAPI}catalog?query=${termino}`;
      return this.http.get<any>(urlBuscarLibros);
  }

  //-------------NOVEDADES-------------

  //Obtener las novedades
  public getNovedades(): Observable<any> {
    const urlNovedades: string = `${this.urlAPI}novedades`;
    return this.http.get<any>(urlNovedades);
  }


  //-------------VERIFICAR CODIGO-------------

  //Obtener el código de acceso a la base de datos y verificarlo
  verificarAcceso(clave: string): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}acceso`, { clave });
  }
}
