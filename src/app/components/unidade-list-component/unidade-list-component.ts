import { Component, OnInit } from "@angular/core";
import { UnidadeService, Unidade } from "../../services/unidade-service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-lista-unidade',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './unidade-list-component.html',
  styleUrls: ['./unidade-list-component.css']
})
export class UnidadeListComponent implements OnInit {
  unidades: Unidade[] = [];
  loading = false;
  unidadeEmEdicao: Unidade | null = null;

  constructor(private unidadeService: UnidadeService) { }

  ngOnInit() {
    this.carregarUnidades();
  }

  abrirModalEdicao(unidade: Unidade) {
    this.unidadeEmEdicao = { ...unidade };
  }

  fecharModalEdicao() {
    this.unidadeEmEdicao = null;
  }

  salvarEdicao() {
    if (!this.unidadeEmEdicao) return;
    this.unidadeService.atualizar(this.unidadeEmEdicao).subscribe({
      next: (unidadeAtualizada) => {
        alert('Unidade atualizada com sucesso!');
        const index = this.unidades.findIndex(u => u.id === unidadeAtualizada.id);
        if (index !== -1) {
          this.unidades[index] = unidadeAtualizada;
        }
        this.fecharModalEdicao();
      },
      error: (e) => alert('Erro ao atualizar: ' + e.message)
    });
  }

  carregarUnidades() {
    this.loading = true;
    this.unidadeService.listar().subscribe({
      next: (dados) => {
        this.unidades = dados;
        this.loading = false;
      },
      error: (e) => {
        console.error('Erro ao carregar lista:', e);
        this.loading = false;
      }
    });
  }

  deletarUnidade(id: string) {
    if (confirm("Tem certeza que deseja excluir esta unidade?")) {
      this.unidadeService.excluir(parseInt(id)).subscribe({
        next: () => {
          this.unidades = this.unidades.filter(u => u.id !== id);
          alert("Unidade excluída com sucesso.");
        },
        error: (e) => alert("Erro ao excluir: " + e.message)
      });
    }
  }
}