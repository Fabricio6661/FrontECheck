import { Component, OnInit } from "@angular/core";
import { QuestionarioService, Formulario } from "../../services/questionario-service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-lista-questionario',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './questionario-list-component.html',
    styleUrls: ['./questionario-list-component.css']
})
export class QuestionarioListComponent implements OnInit {
    questionarios: Formulario[] = [];
    loading = false;
    questionarioEmEdicao: Formulario | null = null;

    constructor(private questionarioService: QuestionarioService) { }

    ngOnInit() {
        this.carregarQuestionarios();
    }

    abrirModalEdicao(questionario: Formulario) {
        this.questionarioEmEdicao = { ...questionario };
    }

    fecharModalEdicao() {
        this.questionarioEmEdicao = null;
    }

    salvarEdicao() {
        if (!this.questionarioEmEdicao) return;
        this.questionarioService.atualizar(this.questionarioEmEdicao).subscribe({
            next: (questionarioAtualizado) => {
                alert('Questionário atualizado com sucesso!');
                const index = this.questionarios.findIndex(q => q.id === questionarioAtualizado.id);
                if (index !== -1) {
                    this.questionarios[index] = questionarioAtualizado;
                }
                this.fecharModalEdicao();
            },
            error: (e) => alert('Erro ao atualizar: ' + e.message)
        });
    }

    carregarQuestionarios() {
        this.loading = true;
        this.questionarioService.listar().subscribe({
            next: (dados) => {
                this.questionarios = dados;
                this.loading = false;
            },
            error: (e) => {
                console.error('Erro ao carregar lista:', e);
                this.loading = false;
            }
        });
    }

    deletarQuestionario(id: number) {
        if (confirm("Tem certeza que deseja excluir este questionário?")) {
            this.questionarioService.excluir(id).subscribe({
                next: () => {
                    this.questionarios = this.questionarios.filter(q => q.id !== id);
                    alert("Questionário excluído com sucesso.");
                },
                error: (e) => alert("Erro ao excluir: " + e.message)
            });
        }
    }
}