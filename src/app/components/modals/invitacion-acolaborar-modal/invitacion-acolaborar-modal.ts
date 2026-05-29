import { ChangeDetectorRef, Component, inject, input, output, signal } from '@angular/core';
import { ListarAmigos } from '../../../models/listar-amigos';
import { FormsModule } from '@angular/forms';
import { EspaciosDeTrabajoService } from '../../../services/espacios-de-trabajo-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-invitacion-acolaborar-modal',
  imports: [FormsModule],
  templateUrl: './invitacion-acolaborar-modal.html',
  styleUrl: './invitacion-acolaborar-modal.css',
})
export class InvitacionAColaborarModal {
  amigo = input.required<ListarAmigos>();
  private espaciosDeTrabajoService = inject(EspaciosDeTrabajoService);
  private toast = inject(ToastService);
  private cdt = inject(ChangeDetectorRef);
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
          this.toast.success("Se ha enviado la solicitud")
        },
        error: (err) => {
          this.cargando = false;
          this.cdt.detectChanges();
          if (err.status === 456) {
            this.toast.error('El usuario ya ha sido invitado a este espacio de trabajo');
          } else if (err.status === 409) {
            this.toast.error('Este usuario ya pertenece a ese espacio de trabajo.');
          } else {
            this.toast.error('Algo salió mal.');
          }
        },
      });
  }
}
