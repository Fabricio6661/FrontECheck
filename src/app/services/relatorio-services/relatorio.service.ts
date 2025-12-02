import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemRelatorio {
  pergunta: string;
  tipo: string;       
  media?: number;
  comentarios?: string[];
  contagemOpcoes?: { [key: string]: number };
}

export interface Relatorio {
  nomeFormulario: string;
  totalAvaliacoes: number;
  itens: ItemRelatorio[];
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl = 'http://localhost:8080/relatorio';

  constructor(private http: HttpClient) { }

  gerarRelatorio(formularioId: number): Observable<Relatorio> {
    return this.http.get<Relatorio>(`${this.apiUrl}/${formularioId}`);
  }

  baixarPdf(formularioId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${formularioId}/pdf`, {
      responseType: 'blob'
    });
  }
}