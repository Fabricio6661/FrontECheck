import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadeModel } from '../models/unidade-model';
import { Observable } from 'rxjs';

// Exportar a interface Unidade (pode ser igual ao UnidadeModel)
export interface Unidade {
  id: string;
  nome: string;
  cnpj: string;
  pais: string;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  autenticar(credenciais: UnidadeModel): Observable<any> { 
      const loginUrl = `${this.apiUrl}/unidade/salvar`;
      return this.http.post<any>(loginUrl, credenciais);
  }

  salvar(unidade: any): Observable<UnidadeModel> {
    const salvarUrl = `${this.apiUrl}/unidade/salvar`;
    return this.http.post<UnidadeModel>(salvarUrl, unidade);
  }

  // Método para listar todas as unidades
  listar(): Observable<UnidadeModel[]> {
    const listarUrl = `${this.apiUrl}/unidade/listar`;
    return this.http.get<UnidadeModel[]>(listarUrl);
  }

  // Alias do método listar (usado no questionario-component)
  listarTodas(): Observable<Unidade[]> {
    return this.listar();
  }

  // Método para excluir uma unidade por ID
excluir(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/unidade/apagar/${id}`, {
    responseType: 'text'
  });
}

  // Método opcional para buscar uma unidade específica por ID
  buscarPorId(id: string): Observable<UnidadeModel> {
    const buscarUrl = `${this.apiUrl}/unidade/${id}`;
    return this.http.get<UnidadeModel>(buscarUrl);
  }
}
