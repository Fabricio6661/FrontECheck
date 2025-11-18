import { Component, ViewChild } from '@angular/core';
import { UsuarioModel } from '../../models/usuario-model'; 
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-component.html',
  styleUrls: ['./usuario-component.css']
})
export class UsuarioComponent {

  @ViewChild('usuarioForm') usuarioForm!: NgForm;

  novoUsuario: UsuarioModel = {
    id: '',
    nome: '',
    email: '',
    senha: '',
    tipo: ''
  };

  constructor(private usuarioService: UsuarioService) {}

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

    const dadosParaSalvar = {
      nome: this.novoUsuario.nome,
      email: this.novoUsuario.email,
      senha: this.novoUsuario.senha,
      tipo: parseInt(this.novoUsuario.tipo) 
    };

    this.usuarioService.salvar(dadosParaSalvar)
      .subscribe({
        next: (usuarioSalvo) => {
          this.loading = false;
          this.sucesso = `Usuário "${usuarioSalvo.nome}" cadastrado com sucesso!`;
          this.usuarioForm.resetForm();
          this.novoUsuario = { id: '', nome: '', email: '', senha: '', tipo: '' };
        },

        error: (erroApi) => {
          this.loading = false;
          console.error('Erro ao cadastrar:', erroApi);
          this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao cadastrar usuário.';
        }
      });
  }
}
