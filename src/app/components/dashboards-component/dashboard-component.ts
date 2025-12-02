import { Component, OnInit } from "@angular/core";
import { QuestionarioService } from "../../services/questionario-service";
import { Relatorio, RelatorioService } from "../../services/relatorio-services/relatorio.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './dashboard-component.html',
    styleUrls: ['./dashboard-component.css']
  })
export class DashboardComponent implements OnInit {
    formularios: any[] = [];
    formularioSelecionadoId: number | null = null;
    
    relatorio: Relatorio | null = null;
    downloading = false;
    loading = false;
    erro = '';
  
    constructor(
      private relatorioService: RelatorioService,
      private questionarioService: QuestionarioService
    ) {}

    ngOnInit() {
        this.carregarFormularios();
      }
    
    carregarFormularios() {
        this.questionarioService.listar().subscribe({
            next: (dados) => this.formularios = dados,
            error: (err) => console.error('Erro ao listar formulários', err)
        });
    }

    carregarRelatorio() {
        if (!this.formularioSelecionadoId) return;
    
        this.loading = true;
        this.relatorio = null;
        this.erro = '';
    
        this.relatorioService.gerarRelatorio(this.formularioSelecionadoId).subscribe({
          next: (dados) => {
            this.relatorio = dados;
            this.loading = false;
          },
          error: (e) => {
            console.error(e);
            this.erro = "Erro ao gerar relatório. Tente novamente.";
            this.loading = false;
          }
        });
    }

    getChaves(mapa: any): string[] {
        return mapa ? Object.keys(mapa) : [];
    }

    downloadPdf() {
        if (!this.formularioSelecionadoId) return;
    
        this.downloading = true;
    
        this.relatorioService.baixarPdf(this.formularioSelecionadoId).subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `relatorio-satisfacao-${this.formularioSelecionadoId}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
            
            this.downloading = false;
          },
          error: (err) => {
            console.error('Erro ao baixar PDF', err);
            alert('Erro ao baixar o PDF.');
            this.downloading = false;
          }
        });
      }
}