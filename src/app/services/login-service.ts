import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    private apiUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    autenticar(credenciais: LoginModel): Observable<any> { 
        const loginUrl = `${this.apiUrl}/usuario/login`;
        return this.http.post<any>(loginUrl, credenciais);
    }
}