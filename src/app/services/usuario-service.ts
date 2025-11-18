import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario-model';

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
    const listarUrl = `${this.apiUrl}/usuarios`;  // Endereço da API para listar usuários
    return this.http.get<UsuarioModel[]>(listarUrl);
  }
}
