import { Component, OnInit } from "@angular/core";
import { Reserva, ReservaService } from "../../services/reserva-services/reserva.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-listar-reserva',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-reserva-component.html',
  styleUrls: ['./listar-reserva-component.css']
})
export class ListarReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  loading = false;
  reservaSelecionada: Reserva | null = null;

  constructor(
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.carregarReservas();
  }

  carregarReservas() {
    this.loading = true;
    this.reservaService.listarTodas().subscribe({
      next: (dados) => {
        this.reservas = dados;
        this.loading = false;
      },
      error: (e) => {
        console.error('Erro ao carregar lista:', e);
        this.loading = false;
      }
    });
  }

  deletarReserva(id: number) {
    if (confirm("Tem certeza que deseja excluir esta reserva?")) {
      this.reservaService.deletar(id).subscribe({
        next: () => {
          this.reservas = this.reservas.filter(r => r.id !== id);
          alert("Reserva excluída com sucesso.");
        },
        error: (e) => alert("Erro ao excluir: " + e.message)
      });
    }
  }

  copiarLink(token: string) {
    const link = `http://localhost:4200/responder/${token}`;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  }

  verDetalhes(reserva: Reserva) {
    this.reservaSelecionada = reserva;
  }

  fecharModal() {
    this.reservaSelecionada = null;
  }
}