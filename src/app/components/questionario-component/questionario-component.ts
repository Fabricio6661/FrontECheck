import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormularioDto, OpcaoRespostaDto, Pergunta, PerguntaDto, QuestionarioService } from '../../services/questionario-service';
import { Unidade, UnidadeService } from '../../services/unidade-service';


@Component({
  selector: 'app-questionario-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './questionario-component.html',
  styleUrls: ['./questionario-component.css']
})
export class QuestionarioComponent implements OnInit {
  unidades: Unidade[] = [];
  novoFormulario = { nome: '', unidadeId: null as number | null, status: true };
  formularioCriadoId: number | null = null;
  mensagem: string = '';
  loading: boolean = false;

  perguntasDoFormulario: Pergunta[] = [];
  novaPergunta: PerguntaDto = { 
    descricao: '', 
    tipo: 'ESTRELAS',
    formularioId: 0};
  editandoIndex: number | null = null;
  novaOpcao: { [key: number]: string } = {};

  constructor(
    private questionarioService: QuestionarioService,
    private unidadeService: UnidadeService,
    private router: Router
  ) {}


  ngOnInit() {
    this.carregarUnidades();
  }

  carregarUnidades() {
    this.loading = true;
    this.unidadeService.listarTodas().subscribe({
      next: (dados) => {
        this.unidades = dados; 
        this.loading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar unidades', erro);
        this.loading = false;
        this.mensagem = 'Erro ao carregar a lista de hotéis. Tente recarregar a página.';
      }
    });
  }

  adicionarOpcao(perguntaId: number) {
    const textoOpcao = this.novaOpcao[perguntaId];

    if (!textoOpcao || textoOpcao.trim() === '') {
      alert('O texto da opção não pode ser vazio.');
      return;
    }

    const dto: OpcaoRespostaDto = {
      opcao: textoOpcao,
      perguntaId: perguntaId
    };

    this.loading = true;

    this.questionarioService.salvarOpcao(dto).subscribe({
      next: (opcaoSalva) => {
        this.loading = false;

        const pergunta = this.perguntasDoFormulario.find(p => p.id === perguntaId);
        if (pergunta) {

          if (!pergunta.opcoesRespostas) {
            pergunta.opcoesRespostas = [];
          }

          pergunta.opcoesRespostas.push(opcaoSalva);
          console.log('Opção salva com ID:', opcaoSalva.id);
        }
        this.novaOpcao[perguntaId] = '';
      },
      error: (erro) => {
        console.error('Erro ao salvar opção:', erro);
        alert('Erro ao salvar opção: ' + (erro.error?.message || erro.message));
      }
    });
  }

  removerOpcao(opcaoId: number, perguntaId: number) {
    if (!confirm('Tem certeza que deseja apagar esta opção?')) {
      return;
    }

    if (!opcaoId) {
      console.error('Tentativa de apagar opção sem ID!');
      return;
    }

    this.questionarioService.deletarOpcao(opcaoId).subscribe({
      next: () => {
        const pergunta = this.perguntasDoFormulario.find(p => p.id === perguntaId);
        if (pergunta) {
          pergunta.opcoesRespostas = pergunta.opcoesRespostas.filter(op => op.id !== opcaoId);
        }
      },
      error: (erro) => {
        console.error('Erro ao deletar opção:', erro);
        alert('Erro ao deletar opção: ' + (erro.error?.message || erro.message));
      }
    });
  }

  criarFormulario() {
    if (!this.novoFormulario.nome || !this.novoFormulario.unidadeId) {
      this.mensagem = 'Por favor, preencha o Nome e a Unidade.';
      return;
    }

    this.loading = true;
    this.mensagem = '';

    const dto: FormularioDto = {
      nome: this.novoFormulario.nome,
      status: this.novoFormulario.status,
      unidadeId: Number(this.novoFormulario.unidadeId)
    };

    this.questionarioService.salvarFormulario(dto).subscribe({
      next: (formularioSalvo) => {
        this.loading = false;
        this.formularioCriadoId = formularioSalvo.id;
        this.mensagem = `Formulário "${formularioSalvo.nome}" criado com sucesso! Agora adicione as perguntas.`;
        this.novaPergunta.formularioId = this.formularioCriadoId!;
      },
      error: (erro) => {
        this.loading = false;
        console.error('Erro ao criar formulário:', erro);
        this.mensagem = 'Erro ao criar formulário. ' + (erro.error?.message || erro.message);
      }
    });
  }

  adicionarPergunta() {
    if (!this.formularioCriadoId || !this.novaPergunta.descricao) {
      alert('Descrição da pergunta não pode estar vazia.');
      return;
    }

    this.questionarioService.salvarPergunta(this.novaPergunta).subscribe({
      next: (perguntaSalva) => {
        if (!perguntaSalva.opcoesRespostas) {
          perguntaSalva.opcoesRespostas = [];
        }
        
        this.perguntasDoFormulario.push(perguntaSalva);
        this.novaPergunta.descricao = '';
      },
      error: (erro) => {
        console.error('Erro ao salvar pergunta:', erro);
        alert('Erro ao salvar pergunta: ' + (erro.error?.message || erro.message));
      }
    });
  }

  removerPergunta(idDaPergunta: number) {
    if (!confirm('Tem certeza que deseja apagar esta pergunta?')) {
      return;
    }

    this.questionarioService.deletarPergunta(idDaPergunta).subscribe({
      next: () => {
        this.perguntasDoFormulario = this.perguntasDoFormulario.filter(p => p.id !== idDaPergunta);
      },
      error: (erro) => {
        console.error('Erro ao deletar pergunta:', erro);
        alert('Erro ao deletar: ' + (erro.error?.message || erro.message));
      }
    });
  }

  atualizarListaPerguntas() {
    if (this.formularioCriadoId) {
      this.questionarioService.getPerguntasPorFormulario(this.formularioCriadoId).subscribe(
        (dados) => {
          this.perguntasDoFormulario = dados;
        }
      );
    }
  }

  concluirCadastro() {
    alert('Questionário concluído com sucesso!');
    this.router.navigate(['/home']);
  }
}
