import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent{
  novoEmail: string = '';
  novaSenha: string = '';
  erro: string = '';
  loading = false;

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


}
}

