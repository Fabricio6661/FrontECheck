import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UsuarioService } from '../../services/usuario-service';
import { TipoUsuario } from "../enums/tipo-usuario.enum";

@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  templateUrl: './lista-usuario-component.html',
  styleUrls: ['./lista-usuario-component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class ListaUsuarioComponent implements OnInit {

  usuarios: any[] = [];
  loading: boolean = false;
  usuarioEmEdicao: any = null;

  // ✅ ADICIONADO: Para modal de exclusão
  usuarioEmExclusao: any = {};

  // ✅ Disponibilizar enum no template
  TipoUsuario = TipoUsuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.loading = true;
    this.usuarioService.listar().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.loading = false;
      }
    });
  }

  abrirModalEdicao(usuario: any): void {
    this.usuarioEmEdicao = {
      ...usuario,
      // ✅ GARANTIR que tipo é string do enum
      tipo: usuario.tipo.toString()
    };

    console.log('📝 Usuario em edição preparado:', this.usuarioEmEdicao);
    const modal = new (window as any).bootstrap.Modal(document.getElementById('editarUsuarioModal'));
    modal.show();
  }

  fecharModalEdicao(): void {
    this.usuarioEmEdicao = null;
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('editarUsuarioModal'));
    if (modal) {
      modal.hide();
    }
  }

  salvarEdicao(): void {
    if (this.usuarioEmEdicao) {

      console.log('🚀 Iniciando salvamento...');
      console.log('📋 Dados a serem salvos:', this.usuarioEmEdicao);
      console.log('🔍 Tipo atual:', this.usuarioEmEdicao.tipo);
      console.log('📝 Tipo em string:', this.usuarioEmEdicao.tipo.toString());

      // ✅ GARANTIR que vamos enviar string
      const dadosParaEnviar = {
        id: this.usuarioEmEdicao.id,
        nome: this.usuarioEmEdicao.nome,
        email: this.usuarioEmEdicao.email,
        senha: this.usuarioEmEdicao.senha || '',
        tipo: this.usuarioEmEdicao.tipo.toString() // ← FORÇAR STRING
      };

      console.log('📦 DTO criado:', dadosParaEnviar);
      console.log('🎯 Tipo no DTO:', dadosParaEnviar.tipo);

      this.usuarioService.atualizar(dadosParaEnviar).subscribe({
        next: (response) => {
          console.log('✅ Sucesso:', response);
          alert('Usuário atualizado com sucesso!');

          // ✅ LIMPAR ESTADO E RECARREGAR
          this.fecharModalEdicao();
          this.usuarioEmEdicao = {}; // ← LIMPAR ESTADO
          this.carregarUsuarios();
        },
        error: (error) => {
          console.error('❌ Erro ao atualizar:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          alert(`Erro ao atualizar: ${error.message || 'Erro desconhecido'}`);
        }
      });
    }
  }

  // ✅ NOVO: Abrir modal de exclusão
  abrirModalExclusao(usuario: any): void {
    console.log('🗑️ Abrindo modal de exclusão para usuário:', usuario);

    // ✅ CRIAR OBJETO INDEPENDENTE PARA EVITAR PROBLEMAS DE ESTADO
    this.usuarioEmExclusao = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    console.log('🗑️ Usuario para exclusão preparado:', this.usuarioEmExclusao);
    const modal = new (window as any).bootstrap.Modal(document.getElementById('exclusaoModal'));
    modal.show();
  }

  // ✅ NOVO: Confirmar exclusão com limpeza de estado
  confirmarExclusao(): void {
    console.log('🗑️ Iniciando exclusão do usuário:', this.usuarioEmExclusao.id);

    // ✅ VERIFICAÇÃO DE SEGURANÇA
    if (!this.usuarioEmExclusao || !this.usuarioEmExclusao.id) {
      console.error('❌ Usuario para exclusão não definido!');
      alert('Erro: usuário não identificado para exclusão');
      return;
    }

    this.usuarioService.excluir(this.usuarioEmExclusao.id).subscribe({
      next: (response) => {
        console.log('✅ Exclusão bem-sucedida:', response);
        alert('Usuário excluído com sucesso!');

        // ✅ TRATAR RESPOSTA STRING
        if (typeof response === 'string') {
          alert('Usuário excluído com sucesso!');
        } else {
          alert('Usuário excluído com sucesso!');
        }

        // ✅ LIMPAR ESTADO E RECARREGAR
        this.fecharModalExclusao();
        this.usuarioEmExclusao = {}; // ← LIMPAR ESTADO
        this.carregarUsuarios();
      },
      error: (error) => {
        console.error('❌ Erro na exclusão:', error);
        console.error('🔍 Status:', error.status);
        console.error('📋 Mensagem:', error.message);
        console.error('🗑️ Usuario que tentou excluir:', this.usuarioEmExclusao);
        alert('Erro ao excluir: ' + error.message);
      }
    });
  }

  // ✅ NOVO: Fechar modal de exclusão
  fecharModalExclusao(): void {
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('exclusaoModal'));
    if (modal) {
      modal.hide();
    }
  }

  // ✅ NOVO: Cancelar exclusão (limpa estado)
  cancelarExclusao(): void {
    console.log('❌ Exclusão cancelada');
    this.usuarioEmExclusao = {}; // ← LIMPAR ESTADO
    this.fecharModalExclusao();
  }

  // ✅ MÉTODO ORIGINAL MANTIDO (para compatibilidade)
  deletarUsuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.excluir(id).subscribe({
        next: () => {
          alert('Usuário excluído com sucesso!');
          this.carregarUsuarios();
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
          alert('Erro ao excluir usuário.');
        }
      });
    }
  }

  // VERIFICAÇÃO DO TIPO NO FRONTEND
  getTipoBadgeClass(tipo: string): string {
    console.log('🎨 Tipo para badge:', tipo);

    switch (tipo) {
      case 'ATENDENTE':
        return 'badge bg-primary';
      case 'GERENTE':
        return 'badge bg-success';
      case 'ADMINISTRADOR':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }
}