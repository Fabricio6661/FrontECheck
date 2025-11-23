import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioService, RespostaDto } from '../../services/responder-form-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-responder-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responder-form-component.html',
  styleUrls: ['./responder-form-component.css']
})
export class ResponderFormularioComponent implements OnInit {

  formularioId!: number;
  formularioNome = '';
  perguntas: any[] = [];

  escala = [1, 2, 3, 4, 5];
  respostas: any = {};  
  loading = true;
  erro = '';
  reservaIdParaTeste = 1;

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
    this.formularioId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarFormulario();
    }
  }

  carregarFormulario() {
    this.formularioService.buscarPorId(this.formularioId).subscribe({
      next: (dados) => {
        this.formularioNome = dados.nome;
        this.perguntas = dados.perguntas;   // ← perguntas vêm daqui
        this.loading = false;
        console.log("Perguntas carregadas:", this.perguntas);
      },
      error: (erro) => {
        this.erro = 'Erro ao carregar formulário.';
        this.loading = false;
      }
    });
  }

  enviarRespostas() {
    const idsPerguntasRespondidas = Object.keys(this.respostas);

    if (idsPerguntasRespondidas.length === 0) {
      alert("Por favor, responda pelo menos uma pergunta.");
      return;
    }

    const requisicoes = idsPerguntasRespondidas.map(idString => {
      const idPergunta = Number(idString);
      const valorResposta = this.respostas[idPergunta];
      
      const perguntaOriginal = this.perguntas.find(p => p.id === idPergunta);
      
      const dto: RespostaDto = {
        reservaId: this.reservaIdParaTeste,
        perguntaId: idPergunta,
        nota: perguntaOriginal?.tipo === 'ESTRELAS' ? Number(valorResposta) : undefined,
        texto: perguntaOriginal?.tipo !== 'ESTRELAS' ? String(valorResposta) : undefined
      };

      return this.formularioService.salvarResposta(dto);
    });

    this.loading = true;

    forkJoin(requisicoes).subscribe({
      next: (res) => {
        this.loading = false;
        alert("Sucesso! Todas as respostas foram enviadas.");
        this.respostas = {};
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert("Erro ao enviar. Verifique se existe uma Reserva com ID 1 no banco de dados.");
      }
    });
  }

}
