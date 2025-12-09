import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuestionarioService, Formulario } from '../../services/questionario-service'; // Importa Formulario do service
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questionario-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './questionario-list-component.html',
  styleUrls: ['./questionario-list-component.css']
})
export class QuestionarioListComponent implements OnInit {

  questionarios: Formulario[] = []; // Usa a interface Formulario do service
  loading: boolean = false;
  erro: string = '';
  sucesso: string = '';

  constructor(private questionarioService: QuestionarioService) {}

  ngOnInit(): void {
    this.carregarQuestionarios();
  }

  carregarQuestionarios() {
    this.erro = '';
    this.sucesso = '';
    this.loading = true;

    this.questionarioService.listar() 
      .subscribe({
        next: (listaQuestionarios) => {
          this.loading = false;
          this.questionarios = listaQuestionarios;
        },
        error: (erroApi) => {
          this.loading = false;
          console.error('Erro ao carregar questionários:', erroApi);
          this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao carregar a lista de questionários.';
        }
      });
  }

  excluirQuestionario(id: number, nome: string) {
    if (confirm(`Tem certeza que deseja excluir o questionário "${nome}"?`)) {
      this.loading = true;
      this.erro = '';
      this.sucesso = '';
      
      this.questionarioService.excluir(id)
        .subscribe({
          next: () => {
            this.loading = false;
            this.sucesso = `Questionário "${nome}" excluído com sucesso.`;
            this.carregarQuestionarios();
          },
          error: (erroApi) => {
            this.loading = false;
            console.error('Erro ao excluir questionário:', erroApi);
            this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao excluir o questionário.';
          }
        });
    }
  }

  // Retorna classe CSS baseada no status
  getStatusClass(status: boolean): string {
    return status ? 'status-ativo' : 'status-inativo';
  }

  // Retorna texto do status
  getStatusTexto(status: boolean): string {
    return status ? 'Ativo' : 'Inativo';
  }

  // Retorna a quantidade de perguntas
  getQuantidadePerguntas(questionario: Formulario): number {
    return questionario.perguntas ? questionario.perguntas.length : 0;
  }
}
