import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

    private urlAPI: string = 'http://localhost:8000/';

    constructor(public http: HttpClient) { }
  
    //LIBROS
    public getLibros(): Observable<Response[]> {
      const urlGetAllLibros: string = `${this.urlAPI}libros`; 
    
      return this.http.get<Response[]>(urlGetAllLibros);
    }

    public agregarLibro(libroData: any): Observable<any> {
      const urlInsertLibro: string = `${this.urlAPI}insert/libros`; 
    
      return this.http.post<any>(urlInsertLibro, libroData);
    }

    public actualizarLibro(isbn: string, datosLibro: any): Observable<any> {
      const urlActualizarLibro: string = `${this.urlAPI}update/libros/${isbn}`; 
      return this.http.put(urlActualizarLibro, datosLibro);
    }

    public obtenerLibro(isbn: string): Observable<any> {
      const urlObtenerLibro: string = `${this.urlAPI}libros/${isbn}`;
      return this.http.get<any>(urlObtenerLibro);
    }

    public eliminarLibro(isbn: string): Observable<any> {
      const urlEliminarLibro: string = `${this.urlAPI}delete/libros/${isbn}`;
      return this.http.delete(urlEliminarLibro);
    }

    //AUTORES
    public getAutores(): Observable<Response[]> {
      const urlGetAllAutores: string = `${this.urlAPI}autor`;
      return this.http.get<Response[]>(urlGetAllAutores);
    }

    public agregarAutor(autorData: any): Observable<any> {
      const urlInsertAutor: string = `${this.urlAPI}insert/autores`; 
    
      return this.http.post<any>(urlInsertAutor, autorData);
    }

    public actualizarAutor(id: number, datosAutor: any): Observable<any> {
      const urlActualizarAutor: string = `${this.urlAPI}update/autores/${id}`; 
      return this.http.put(urlActualizarAutor, datosAutor);
    }

    public obtenerAutor(id: number): Observable<any> {
      const urlObtenerAutor: string = `${this.urlAPI}autores/${id}`;
      return this.http.get<any>(urlObtenerAutor);
    }

    public eliminarAutor(id: number): Observable<any> {
      const urlEliminarAutor: string = `${this.urlAPI}delete/autores/${id}`;
      return this.http.delete(urlEliminarAutor);
    }

    //EDITORIALES

    public getEditoriales(): Observable<Response[]> {
      const urlGetAllEditoriales: string = `${this.urlAPI}editorial`;
      return this.http.get<Response[]>(urlGetAllEditoriales);
    }

    public agregarEditorial(editorialData: any): Observable<any> {
      const urlInsertEditorial: string = `${this.urlAPI}insert/editoriales`; 
    
      return this.http.post<any>(urlInsertEditorial, editorialData);
    }

    public actualizarEditorial(id: number, datosEditorial: any): Observable<any> {
      const urlActualizarEditorial: string = `${this.urlAPI}update/editoriales/${id}`; 
      return this.http.put(urlActualizarEditorial, datosEditorial);
    }

    public obtenerEditorial(id: number): Observable<any> {
      const urlObtenerEditorial: string = `${this.urlAPI}editoriales/${id}`;
      return this.http.get<any>(urlObtenerEditorial);
    }

    public eliminarEditorial(id: number): Observable<any> {
      const urlEliminarEditorial: string = `${this.urlAPI}delete/editoriales/${id}`;
      return this.http.delete(urlEliminarEditorial);
    }

}
