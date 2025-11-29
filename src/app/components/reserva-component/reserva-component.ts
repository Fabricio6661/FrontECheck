import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Reserva, ReservaService } from "../../services/reserva-services/reserva.service";
import { Unidade, UnidadeService } from "../../services/unidade-service";

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

    novaReserva: Reserva = {
      unidadeId: 0,
      email: '',
      cpf: '',
      telefone: '',
      dataCheckin: '',
      dataCheckout: '',
      status: 'EM_ANDAMENTO'
    };

    constructor(
        private reservaService: ReservaService,
        private unidadeService: UnidadeService
      ) {}

    loading = false;

    ngOnInit() {
        this.carregarDados();
      }

      carregarDados() {
        this.loading = true;
        this.unidadeService.listarTodas().subscribe(dados => this.unidades = dados);
        
        this.reservaService.listarTodas().subscribe({
          next: (dados) => {
            this.reservas = dados;
            this.loading = false;
          },
          error: (e) => {
            console.error(e);
            this.loading = false;
          }
        });
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