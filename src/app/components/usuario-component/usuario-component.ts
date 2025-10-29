import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/usuario-model'; 
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './usuario-component.html',
  styleUrls: ['./usuario-component.css']
})
export class UsuarioComponent {
  novoUsuario: UsuarioModel = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    tipo: ''
  };

  erro: string = '';
  sucesso: string = '';
  loading: boolean = false;

  cadastrar() {
    this.erro = '';
    this.sucesso = '';

    if (!this.novoUsuario.nome || !this.novoUsuario.email || !this.novoUsuario.senha || !this.novoUsuario.tipo) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.loading = true;

    // Simula chamada ao backend
    setTimeout(() => {
      this.loading = false;
      this.sucesso = 'Usuário cadastrado com sucesso!';
      this.novoUsuario = { id: '', nome: '', email: '', senha: '', tipo: '' };}, 1500);
  }
}
