import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Reserva, ReservaService } from "../../services/reserva-services/reserva.service";
import { Unidade, UnidadeService } from "../../services/unidade-service";
import { QuestionarioService } from "../../services/questionario-service";

@Component({
    selector: 'app-reserva',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reserva-component.html',
    styleUrls: ['./reserva-component.css']
  })
export class ReservaComponent implements OnInit {
    reservas: Reserva[] = [];
    unidades: Unidade[] = [];
    todosFormularios: any[] = [];
    formulariosFiltrados: any[] = [];

    novaReserva: Reserva = {
      unidadeId: 0,
      formularioId: null,
      email: '',
      cpf: '',
      telefone: '',
      dataCheckin: '',
      dataCheckout: '',
      status: 'EM_ANDAMENTO'
    };

    constructor(
        private reservaService: ReservaService,
        private unidadeService: UnidadeService,
        private questionarioService: QuestionarioService
      ) {}

    loading = false;

    ngOnInit() {
        this.carregarDados();
      }

      carregarDados() {
        this.loading = true;
      
        this.unidadeService.listarTodas().subscribe(dados => this.unidades = dados);
        this.reservaService.listarTodas().subscribe(dados => this.reservas = dados);
      
        this.questionarioService.listar().subscribe({
          next: (dados) => {
            this.todosFormularios = dados;
            console.log("Todos os formulários carregados:", this.todosFormularios);
    
            this.aoMudarUnidade();
            this.loading = false;
          },
          error: (e) => {
            console.error("Erro ao carregar formulários:", e);
            this.loading = false;
          }
        });
      }
      
      aoMudarUnidade() {
        const unidadeRaw = this.novaReserva.unidadeId;
        console.log("aoMudarUnidade() -> unidadeRaw:", unidadeRaw, typeof unidadeRaw);
        const idUnidadeSelecionada = unidadeRaw == null ? null : Number(unidadeRaw);
      
        this.novaReserva.formularioId = null;
      
        if (!this.todosFormularios || this.todosFormularios.length === 0) {
          console.log("Ainda sem todosFormularios — formulariosFiltrados ficará vazio");
          this.formulariosFiltrados = [];
          return;
        }
      
        if (idUnidadeSelecionada) {
          this.formulariosFiltrados = this.todosFormularios.filter(f =>
            Number((f as any).unidadeId) === idUnidadeSelecionada
          );
      
          console.log("Formulários filtrados para a unidade", idUnidadeSelecionada, this.formulariosFiltrados);
        } else {
          this.formulariosFiltrados = [];
          console.log("Nenhuma unidade selecionada — formulariosFiltrados vazio");
        }
      }


      salvarReserva() {
        if (!this.novaReserva.unidadeId || !this.novaReserva.email) {
          alert("Preencha a Unidade e o Email!");
          return;
        }
    
        this.novaReserva.unidadeId = Number(this.novaReserva.unidadeId);
    
        this.reservaService.salvar(this.novaReserva).subscribe({
          next: (reservaSalva) => {
            alert("Reserva criada com sucesso!");

            this.reservas.push(reservaSalva);
            this.novaReserva = { 
                unidadeId: 0, email: '', cpf: '', telefone: '', 
                dataCheckin: '', dataCheckout: '', status: 'EM_ANDAMENTO' 
            };
          },
          error: (e) => alert("Erro ao criar reserva: " + e.message)
        });
      }

      deletarReserva(id: number) {
        if (confirm("Tem certeza?")) {
          this.reservaService.deletar(id).subscribe(() => {
            this.reservas = this.reservas.filter(r => r.id !== id);
          });
        }
      }

      copiarLink(token: string) {
        const link = `http://localhost:4200/responderform/${token}`;
        navigator.clipboard.writeText(link).then(() => {
          alert("Link copiado para a área de transferência!");
        });
      }
}