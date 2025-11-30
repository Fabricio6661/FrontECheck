import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reserva {
  id?: number;
  unidadeId: number;
  formularioId?: number | null;
  
  email: string;
  cpf?: string;
  telefone?: string;
  dataCheckin: string; 
  dataCheckout: string;
  status: string;
  

  token?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8080/reserva';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/listar`);
  }

  salvar(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/salvar`, reserva);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apagar/${id}`);
  }
}