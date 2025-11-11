import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface PerguntaDto {
    descricao: string;
    tipo: string; // Deve ser 'TEXTO_ABERTO', 'MULTIPLA_ESCOLHA', ou 'ESTRELAS'
    formularioId: number;
    // ajuda?: string; // Descomentar quando adicionar 'ajuda' no DTO Java
  }

  export interface FormularioDto {
    nome: string;
    status: boolean;
    unidadeId: number;
  }

  export interface Pergunta {
    id: number;
    descricao: string;
    tipo: string;
    // ajuda?: string; // Descomentar quando adicionar 'ajuda' no DTO Java
    opcoesRespostas: any[];
  }

  @Injectable({
    providedIn: 'root'
  })
  export class QuestionarioService {
  
    private apiUrl = 'http://localhost:8080';
  
    constructor(private http: HttpClient) { }
  
    getFormulario(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/formulario/${id}`);
    }
    
    // (Você pode adicionar createFormulario, updateFormulario, etc. aqui depois)
  
    getPerguntasPorFormulario(formularioId: number): Observable<Pergunta[]> {
      return this.http.get<Pergunta[]>(`${this.apiUrl}/pergunta/formulario/${formularioId}`);
    }
  
    salvarPergunta(perguntaData: PerguntaDto): Observable<Pergunta> {
      return this.http.post<Pergunta>(`${this.apiUrl}/pergunta/salvar`, perguntaData);
    }
  
    deletarPergunta(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/pergunta/apagar/${id}`);
    }

    salvarFormulario(dadosFormulario: FormularioDto): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/formulario/salvar`, dadosFormulario);
    }
  }