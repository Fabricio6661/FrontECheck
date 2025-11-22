import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pergunta } from "./questionario-service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/formulario/${id}`);
  }

  responderFormulario(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/formulario/responder`, payload);
  }

  /** Buscar perguntas do formulário */
  getPerguntasPorFormulario(id: number): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.apiUrl}/pergunta/formulario/${id}`);
  }
}
