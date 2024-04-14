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
}
