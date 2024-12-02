import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiUrl='http://localhost:8080/api/notas';

  constructor(private http:HttpClient) { }

  getNotas():Observable<Nota[]>{
    return this.http.get<Nota[]>(this.apiUrl);
  }

  getNotasById(id:number):Observable<Nota>{
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  crearNotas(coche:Nota):Observable<Nota>{
    return this.http.post<Nota>(this.apiUrl, coche);
  }
  
  deleteNotas(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateNotas(nota:Nota, id:number):Observable<Nota>{
    return this.http.put<Nota>(`${this.apiUrl}/${id}`, nota);
  }
}
