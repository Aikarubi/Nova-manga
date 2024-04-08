import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  /*private urlAPI: string = 'http://localhost:8000/libros';

  constructor(public http: HttpClient) { }
*/
  /*public getResponse(): Observable<Response> {
    return this.http.get<Response>('http://localhost:8000/libros');
  }*/

    /**
   * Gets all the users from the API.
   * @returns {Response[]}
   */
    /*public getLibros(): Observable<Response[]> {
      const urlGetAllLibros: string = `${this.urlAPI}libros`;
  
      return this.http.get<Response[]>(urlGetAllLibros);
    } */
  
    private urlAPI: string = 'http://localhost:8000/';

    constructor(public http: HttpClient) { }
  
    public getLibros(): Observable<Response[]> {
      const urlGetAllLibros: string = `${this.urlAPI}libros`; // Asegúrate de agregar un "/" después de "8000" para separar el dominio de la ruta
    
      return this.http.get<Response[]>(urlGetAllLibros);
    }
}
