import { Component, inject, input, output, signal } from '@angular/core';
import { ListarAmigos } from '../../../models/listar-amigos';
import { FormsModule } from '@angular/forms';
import { EspaciosDeTrabajoService } from '../../../services/espacios-de-trabajo-service';

@Component({
  selector: 'app-invitacion-acolaborar-modal',
  imports: [FormsModule],
  templateUrl: './invitacion-acolaborar-modal.html',
  styleUrl: './invitacion-acolaborar-modal.css',
})
export class InvitacionAColaborarModal {
  amigo = input.required<ListarAmigos>();
  private espaciosDeTrabajoService = inject(EspaciosDeTrabajoService);
  espaciosDeTrabajo = this.espaciosDeTrabajoService.espaciosDeTrabajo;
  seleccionarEspacio = signal;
  cerrar = output<void>();
  error = '';
  cargando = false;

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrar.emit();
    }
  }
  InvitarAlEspacio(idEspacioDeTrabajo: number, idUsuario: number) {
    this.espaciosDeTrabajoService
      .invitarAEspacioDeTrabajo(idEspacioDeTrabajo, idUsuario)
      .subscribe({
        next: (res) => {
          this.cargando = false;
        },
        error: (err) => {
          this.cargando = false;
          this.error = 'Algo salió mal';
        },
      });
  }
}
