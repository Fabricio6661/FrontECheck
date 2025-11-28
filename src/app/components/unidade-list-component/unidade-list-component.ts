import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UnidadeModel } from '../../models/unidade-model'; 
import { UnidadeService } from '../../services/unidade-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unidade-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './unidade-list-component.html',
  styleUrls: ['./unidade-list-component.css']
})
export class UnidadeListComponent implements OnInit {

  unidades: UnidadeModel[] = [];
  loading: boolean = false;
  erro: string = '';
  sucesso: string = '';

  constructor(private unidadeService: UnidadeService) {}

  ngOnInit(): void {
    this.carregarUnidades();
  }

  carregarUnidades() {
    this.erro = '';
    this.sucesso = '';
    this.loading = true;

    this.unidadeService.listar() 
      .subscribe({
        next: (listaUnidades) => {
          this.loading = false;
          this.unidades = listaUnidades;
        },
        error: (erroApi) => {
          this.loading = false;
          console.error('Erro ao carregar unidades:', erroApi);
          this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao carregar a lista de unidades.';
        }
      });
  }

  excluirUnidade(id: string, nome: string) {
    if (confirm(`Tem certeza que deseja excluir a unidade "${nome}"?`)) {
      this.loading = true;
      this.erro = '';
      this.sucesso = '';
      
      this.unidadeService.excluir(id)
        .subscribe({
          next: () => {
            this.loading = false;
            this.sucesso = `Unidade "${nome}" excluída com sucesso.`;
            this.carregarUnidades();
          },
          error: (erroApi) => {
            this.loading = false;
            console.error('Erro ao excluir unidade:', erroApi);
            this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao excluir a unidade.';
          }
        });
    }
  }

  // Formata o CNPJ para exibição
  formatarCNPJ(cnpj: string): string {
    if (!cnpj) return '';
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/\D/g, '');
    // Aplica máscara: XX.XXX.XXX/XXXX-XX
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  // Monta endereço completo
  getEnderecoCompleto(unidade: UnidadeModel): string {
    return `${unidade.rua}, ${unidade.numero} - ${unidade.bairro}, ${unidade.cidade}/${unidade.uf}`;
  }
}
