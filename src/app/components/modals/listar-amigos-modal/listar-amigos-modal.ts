import { Component, inject, input, output, signal } from '@angular/core';
import { ListarAmigos } from '../../../models/listar-amigos';
import { AmigosService } from '../../../services/amigos-service';
import { EspaciosDeTrabajoService } from '../../../services/espacios-de-trabajo-service';
import { MostrarEspaciosDeTrabajo } from '../../../models/mostrar-espacios-de-trabajo';
import { InvitacionAColaborarModal } from "../invitacion-acolaborar-modal/invitacion-acolaborar-modal";

@Component({
  selector: 'app-listar-amigos-modal',
  imports: [InvitacionAColaborarModal],
  templateUrl: './listar-amigos-modal.html',
  styleUrl: './listar-amigos-modal.css',
})
export class ListarAmigosModal {
  cerrar = output<void>();
  cargando = false;
  error = '';
  amigoSeleccionado = signal<ListarAmigos | null>(null);
  amigos = input.required<ListarAmigos[]>();
  InvitacionAColaborarAbierta = signal(false);
  private amigosService = inject(AmigosService);
  private espaciosDeTrabajoService = inject(EspaciosDeTrabajoService);
  espaciosDeTrabajo = this.espaciosDeTrabajoService.espaciosDeTrabajo;

  onOverlayClick(event: MouseEvent) {
    console.log('target:', (event.target as HTMLElement).className);
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrar.emit();
    }
  }

  MostrarAmigos() {
    this.amigosService.ListarTodosLosAmigos().subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.error = 'No hay solicitudes.';
          return;
        }
      },
    });
  }

abrirModal(amigo: ListarAmigos) {
  this.amigoSeleccionado.set(amigo);
  this.InvitacionAColaborarAbierta.set(true);
}
}
