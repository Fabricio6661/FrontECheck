import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-questionario-component',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './questionario-component.html',
  styleUrls: ['./questionario-component.css']
})
export class QuestionarioComponent {

  perguntas: any[] = [
    { texto: 'Nota de avaliação do estabelecimento (estrutura)', tipo: 'estrelas' },
    { texto: 'Nota de avaliação do atendimento (funcionários)', tipo: 'estrelas' },
    { texto: 'Avaliação da organização do hotel', tipo: 'estrelas' },
    { texto: 'Você recomendaria este hotel a alguém?', tipo: 'simnao' }
  ];

  novaPergunta = { texto: '', tipo: 'estrelas', ajuda: '' };
  editandoIndex: number | null = null;

  adicionarPergunta() {
    if (this.editandoIndex !== null) {
      this.perguntas[this.editandoIndex] = { ...this.novaPergunta };
      this.editandoIndex = null;
    } else {
      this.perguntas.push({ ...this.novaPergunta });
    }

    this.novaPergunta = { texto: '', tipo: 'estrelas', ajuda: '' };
  }

  editarPergunta(index: number) {
    this.novaPergunta = { ...this.perguntas[index] };
    this.editandoIndex = index;
  }

  removerPergunta(index: number) {
    this.perguntas.splice(index, 1);
  }

  salvarAlteracoes() {
    console.log('Perguntas salvas:', this.perguntas);
    alert('Alterações salvas com sucesso!');
  }
}
