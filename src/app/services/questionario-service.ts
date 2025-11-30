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

  export interface Formulario {
    id: number;
    nome: string;
    status: boolean;
    unidadeId: number;
    perguntas?: Pergunta[];
  }

  export interface OpcaoRespostaDto {
    opcao: string;
    perguntaId: number;
  }

  export interface OpcaoResposta {
    id: number;
    opcao: string;
  }

  export interface Pergunta {
    id: number;
    descricao: string;
    tipo: string;
    // ajuda?: string; // Descomentar quando adicionar 'ajuda' no DTO Java
    opcoesRespostas: OpcaoResposta[];
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

    // NOVO: Método para listar todos os formulários
    listar(): Observable<Formulario[]> {
      return this.http.get<Formulario[]>(`${this.apiUrl}/formulario/listar`);
    }

    // NOVO: Método para excluir formulário
    excluir(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/formulario/apagar/${id}`);
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

    salvarOpcao(dadosOpcao: OpcaoRespostaDto): Observable<OpcaoResposta> {
      return this.http.post<OpcaoResposta>(`${this.apiUrl}/opcao/salvar`, dadosOpcao);
    }

    deletarOpcao(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/opcao/apagar/${id}`);
    }
    
    listarPorUnidade(unidadeId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/formulario/unidade/${unidadeId}`);
    }
  }
