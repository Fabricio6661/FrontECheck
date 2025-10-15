import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent {
  novoEmail: string = '';
  novaSenha: string = '';
  erro: string = '';
  loading = false;

  constructor(private router: Router) {}

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

    // Simulação de validação (substitua pela lógica real)
    setTimeout(() => {
      this.loading = false;
      if (this.novoEmail === 'user@example.com' && this.novaSenha === '123456') {
        this.router.navigate(['/home']);
      } else {
        this.erro = 'Email ou senha inválidos';
      }
    }, 1500);
  }
}
