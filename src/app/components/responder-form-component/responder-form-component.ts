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
  reservaId!: number;

  escala = [1, 2, 3, 4, 5];
  respostas: any = {};  
  loading = true;
  erro = '';
  sucesso = false;

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');

    if (token) {
      this.validarTokenECarregar(token);
    }else {
      this.erro = 'Link inválido. Nenhum token encontrado.';
      this.loading = false;
    }
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
        reservaId: this.reservaId,
        perguntaId: idPergunta,
        nota: perguntaOriginal?.tipo === 'ESTRELAS' ? Number(valorResposta) : undefined,
        texto: perguntaOriginal?.tipo !== 'ESTRELAS' ? String(valorResposta) : undefined
      };

      return this.formularioService.salvarResposta(dto);
    });

    this.loading = true;
    
    forkJoin(requisicoes).subscribe({
      next: () => {
        this.loading = false;
        this.sucesso = true;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert("Ocorreu um erro ao enviar suas respostas. Tente novamente.");
      }
    });
  }

  validarTokenECarregar(token: string) {
    this.loading = true;
  
    this.formularioService.buscarReservaPorToken(token).subscribe({
      next: (reserva) => {
        console.log('Reserva encontrada:', reserva);
        this.reservaId = reserva.id;

        if (reserva.formulario && reserva.formulario.id) {
          this.formularioId = reserva.formulario.id;
          this.carregarPerguntasDoFormulario(this.formularioId);
        } else {
          this.erro = 'Esta reserva ainda não possui um questionário vinculado.';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Link inválido ou expirado. Reserva não encontrada.';
        this.loading = false;
      }
    });
  }

  carregarPerguntasDoFormulario(id: number) {
    this.formularioService.buscarPorId(id).subscribe({
      next: (formCompleto) => {
        this.formularioNome = formCompleto.nome;
        this.perguntas = formCompleto.perguntas || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Erro ao carregar as perguntas do formulário.';
        this.loading = false;
      }
    });
  }

}
