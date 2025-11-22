import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioService } from '../../services/responder-form-service';

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

  respostas: any = {};  
  loading = true;
  erro = '';

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) {}

  ngOnInit() {
    this.formularioId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarFormulario();
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
    const payload = {
      formularioId: this.formularioId,
      respostas: Object.keys(this.respostas).map(idPergunta => ({
        perguntaId: Number(idPergunta),
        resposta: this.respostas[idPergunta]
      }))
    };

    this.formularioService.responderFormulario(payload).subscribe({
      next: () => {
        alert("Respostas enviadas com sucesso!");
      },
      error: () => {
        alert("Erro ao enviar respostas.");
      }
    });
  }

}
