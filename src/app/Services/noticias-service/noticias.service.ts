import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from 'src/app/models/noticia.models';
import { Autor } from 'src/app/models/autor.models';

const url: string = 'http://192.168.0.33/api/noticia/';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  

  constructor(private http: HttpClient) { }

  verNoticias() : Observable<Noticia[]>{
    return this.http.get<Noticia[]>("http://192.168.0.33/api/noticia/obtener");
  }

  eliminarNoticia(noticiaID:number):Observable<boolean>
  {
    return this.http.delete<boolean>(url+"eliminar/"+ noticiaID);
  }

  listadoAutores():Observable<Autor[]>
  {
    return this.http.get<Autor[]>(url+"autores");
  }

  agregarNoticia(noticia: Noticia): Observable<boolean>
  {
    return this.http.post<boolean>(url+"agregar",noticia);
  }

  editarNoticia(noticia: Noticia): Observable<boolean>
  {
    return this.http.put<boolean>(url+"editar",noticia);
  }

}
