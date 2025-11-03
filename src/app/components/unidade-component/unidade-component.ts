import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UnidadeModel } from '../../models/unidade-model';
import { UnidadeService } from '../../services/unidade-service';

@Component({
  selector: 'app-unidade-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './unidade-component.html',
  styleUrl: './unidade-component.css'
})
export class UnidadeComponent {
  

  @ViewChild('unidadeForm') usuarioForm!: NgForm;

  novaUnidade: UnidadeModel = {
    id: '',
    nome: '',
    cnpj: '',
    uf:'',
    pais: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: ''
  };

  constructor(private UnidadeService: UnidadeService) {}

  erro: string = '';
  sucesso: string = '';
  loading: boolean = false;

  cadastrar() {
    this.erro = '';
    this.sucesso = '';

    if (!this.novaUnidade.nome || !this.novaUnidade.cnpj || !this.novaUnidade.uf || !this.novaUnidade.pais || !this.novaUnidade.cidade  || !this.novaUnidade.bairro || !this.novaUnidade.rua || !this.novaUnidade.numero) {
      this.erro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.loading = true;

    const dadosParaSalvar = {
      nome: this.novaUnidade.nome,
      cnpj: this.novaUnidade.cnpj,
      pais: this.novaUnidade.pais,
      uf: this.novaUnidade.uf,
      cidade: this.novaUnidade.cidade,
      bairro: this.novaUnidade.bairro,
      rua: this.novaUnidade.rua,
      numero: this.novaUnidade.numero

    };

    this.UnidadeService.salvar(dadosParaSalvar)
      .subscribe({
        next: (unidadeSalva) => {
          this.loading = false;
          this.sucesso = `Unidade "${unidadeSalva.nome}" cadastrado com sucesso!`;
          this.usuarioForm.resetForm();
          this.novaUnidade = { id: '', nome: '', cnpj: '', pais: '', uf: '', cidade: '', bairro: '', rua: '', numero: ''};
        },

        error: (erroApi) => {
          this.loading = false;
          console.error('Erro ao cadastrar:', erroApi);
          this.erro = erroApi.error?.message || erroApi.message || 'Erro desconhecido ao cadastrar unidade.';
        }
      });
  }

}
