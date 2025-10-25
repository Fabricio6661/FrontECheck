import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { CommonModule } from '@angular/common';
import { LoginModel } from '../../models/login-model';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  novoEmail: string = '';
  novaSenha: string = '';
  erro: string = '';
  loading = false;

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    this.erro = '';

    if (!this.novoEmail.trim()) {
      this.erro = 'Informe o Email';
      return;
    }

    if (!this.novaSenha.trim()) {
      this.erro = 'Informe a Senha';
      return;
    }

    this.loading = true;

    const credenciais: LoginModel = {
      email: this.novoEmail,
      senha: this.novaSenha
    };

    this.loginService.autenticar(credenciais)
      .subscribe({
        next: (resposta) => {
          console.log('Login bem-sucedido!', resposta); 
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (erroApi) => {
          console.error('Erro no login:', erroApi);
          this.loading = false;
          this.erro = erroApi.error?.message || erroApi.message || 'Email ou senha inválidos';
        }
      });
  }
}
