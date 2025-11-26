import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pergunta } from "./questionario-service";
import { Injectable } from "@angular/core";

export interface RespostaDto {
  reservaId: number;
  perguntaId: number;
  texto?: string;
  nota?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/formulario/${id}`);
  }

  buscarReservaPorToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reserva/validar/${token}`);
  }

  salvarResposta(dto: RespostaDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resposta/salvar`, dto);
  }

  //verificar se é necessário esse método
  responderFormulario(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/formulario/responder`, payload);
  }

  //verificar se é necessário esse método
  /** Buscar perguntas do formulário */
  getPerguntasPorFormulario(id: number): Observable<Pergunta[]> {
    return this.http.get<Pergunta[]>(`${this.apiUrl}/pergunta/formulario/${id}`);
  }
}
