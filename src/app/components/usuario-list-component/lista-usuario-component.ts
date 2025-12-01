import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioModel } from '../../models/usuario-model'; 
import { UsuarioService } from '../../services/usuario-service';
import { FormsModule } from '@angular/forms'; // Mantendo o padrão de imports, mesmo que não use diretamente NgForm

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './lista-usuario-component.html',
  styleUrls: ['./lista-usuario-component.css']
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: UsuarioModel[] = []; // Array para armazenar os usuários
  loading: boolean = false;
  erro: string = '';
  sucesso: string = ''; // Pode ser usado para mensagens após excluir ou editar

  // Injetamos o serviço de usuário (já existe no seu padrão)
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Carrega os usuários assim que o componente é inicializado
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.erro = '';
    this.loading = true;

    // Assumindo que o UsuarioService tem um método 'listar'
    this.usuarioService.listar() 
      .subscribe({
        next: (listaUsuarios) => {
          this.loading = false;
          this.usuarios = listaUsuarios; // Armazena a lista
        },
        error: (erroApi) => {
          this.loading = false;
          console.error('Erro ao carregar usuários:', erroApi);
          this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao carregar a lista de usuários.';
        }
      });
  }

  // Futuramente, você pode implementar os métodos de exclusão
  excluirUsuario(id: string, nome: string) {
    if (confirm(`Tem certeza que deseja excluir o usuário "${nome}"?`)) {
      this.loading = true;
      this.usuarioService.excluir(Number(id)) // Assumindo que o serviço tem um método 'excluir'
        .subscribe({
          next: () => {
            this.loading = false;
            this.sucesso = `Usuário "${nome}" excluído com sucesso.`;
            // Recarrega a lista para refletir a exclusão
            this.carregarUsuarios(); 
          },
          error: (erroApi) => {
            this.loading = false;
            console.error('Erro ao excluir usuário:', erroApi);
            this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao excluir o usuário.';
          }
        });
    }
  }

  // Helper para mostrar o tipo como texto
  getTipoUsuario(tipo: string): string {
    switch (tipo) {
      case '0':
        return 'Atendente';
      case '1':
        return 'Gerente';
      default:
        return 'Desconhecido';
    }
  }
}