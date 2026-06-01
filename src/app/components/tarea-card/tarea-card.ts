import { ChangeDetectorRef, Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObtenerTareas } from '../../models/obtener-tareas';
import { EditarTareaModal } from '../modals/editar-tarea-modal/editar-tarea-modal';
import { TareasService } from '../../services/tareas-service';
import { DatePipe } from '@angular/common';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-tarea-card',
  imports: [EditarTareaModal, FormsModule, DatePipe],
  templateUrl: './tarea-card.html',
  styleUrl: './tarea-card.css',
})
export class TareaCard {
  tarea = input.required<ObtenerTareas>();

  tareaEditada = output<void>();
  tareaEliminada = output<void>();

  modalEditarAbierto = signal(false);
  modalPriorizarAbierto = signal(false);
  
  fechaLimite = signal('');
  error = signal('');
  cargando = false;

  private tareasService = inject(TareasService);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  cambiarEstado(nuevoEstado: number) {
    const t = this.tarea();
    this.tareasService
      .EditarTarea(
        {
          nombreTarea: t.nombreTarea,
          descripcionTarea: t.descripcionTarea,
          estadosTarea: nuevoEstado,
          tiposTarea: t.tiposTarea,
          idUsuarioDeLaTarea: t.idUsuarioDeLaTarea,
        },
        t.idTarea,
      )
      .subscribe({ next: () => this.tareaEditada.emit() });
  }

  priorizarTarea() {
    if (!this.fechaLimite()) {
      this.error.set('La fecha límite es obligatoria.');
      return;
    }
    this.cargando = true;
    const t = this.tarea();
    this.tareasService
      .PriorizarTarea(
        {
          nombreTarea: t.nombreTarea,
          descripcionTarea: t.descripcionTarea,
          fechaCreacionTarea: t.fechaCreacionTarea,
          estadosTarea: t.estadosTarea,
          estaEliminado: t.estaEliminado,
          tiposTarea: t.tiposTarea,
          idUsuarioDeLaTarea: t.idUsuarioDeLaTarea,
          idEspacioDeTrabajo: t.espacioDeTrabajoId,
          tienePrioridad: true,
          fechaLimite: new Date(this.fechaLimite()),
        },
        t.idTarea,
      )
      .subscribe({
        next: () => {
          this.modalPriorizarAbierto.set(false);
          this.fechaLimite.set('');
          this.error.set('');
          this.tareaEditada.emit();
          this.cargando = false;
          this.toast.success('Tarea priorizada');
        },
        error: (err) => {
          this.cargando = false;
          this.cdr.detectChanges();
          this.error.set('Error al priorizar la tarea.');
          this.toast.error('Error al priorizar');
          console.error(err);
        },
      });
  }
}
