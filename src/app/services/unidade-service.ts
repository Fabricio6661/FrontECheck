import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadeModel } from '../models/unidade-model';
import { Observable } from 'rxjs';

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
  
}
