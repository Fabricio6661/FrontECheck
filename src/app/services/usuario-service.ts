import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario-model';
import { UsuarioUpdateDto } from '../components/dtos/tipo-usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  autenticar(credenciais: UsuarioModel): Observable<any> {
    const loginUrl = `${this.apiUrl}/usuarios`;
    return this.http.post<any>(loginUrl, credenciais);
  }

  salvar(usuario: any): Observable<UsuarioModel> {
    const salvarUrl = `${this.apiUrl}/usuario/salvar`;
    return this.http.post<UsuarioModel>(salvarUrl, usuario);
  }

  listar(): Observable<UsuarioModel[]> {
    const listarUrl = `${this.apiUrl}/usuario/listar`;  // Endereço da API para listar usuários
    return this.http.get<UsuarioModel[]>(listarUrl);
  }

  excluir(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuario/apagar/${id}`, {}, {
      responseType: 'text' as 'json'
    });
  }

  atualizar(dados: UsuarioUpdateDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuario/atualizar/${dados.id}`, dados);
  }
}
