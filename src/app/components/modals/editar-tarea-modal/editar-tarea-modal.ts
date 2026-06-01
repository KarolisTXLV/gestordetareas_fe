import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas-service';
import { ObtenerTareas } from '../../../models/obtener-tareas';
import { EditarTarea } from '../../../models/editar-tarea';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-editar-tarea-modal',
  imports: [FormsModule],
  templateUrl: './editar-tarea-modal.html',
  styleUrl: './editar-tarea-modal.css',
})
export class EditarTareaModal implements OnInit {
  tarea = input.required<ObtenerTareas>();

  cerrar         = output<void>();
  tareaEditada   = output<void>();
  tareaPriorizada =output<void>();
  tareaEliminada = output<void>();

  nombreTarea      = '';
  descripcionTarea = '';
  fechaFin         = '';
  cargando         = false;
  error            = '';

  private tareaService = inject(TareasService);
  private toast = inject(ToastService)

  ngOnInit() {
    this.nombreTarea      = this.tarea().nombreTarea;
    this.descripcionTarea = this.tarea().descripcionTarea;
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrar.emit();
    }
  }

  onSubmit() {
    if (!this.nombreTarea.trim()) {
      this.error = 'El nombre de la tarea es obligatorio.';
      return;
    }

    this.cargando = true;
    this.error    = '';

    const t = this.tarea();
    const dto: EditarTarea = {
      nombreTarea:        this.nombreTarea.trim(),
      descripcionTarea:   this.descripcionTarea.trim(),
      estadosTarea:       t.estadosTarea,
      tiposTarea:         t.tiposTarea,
      idUsuarioDeLaTarea: t.idUsuarioDeLaTarea,
    };

    this.tareaService.EditarTarea(dto, t.idTarea).subscribe({
      next: () => {
        this.cargando = false;
        this.tareaEditada.emit();
        this.cerrar.emit();
        this.toast.success("Tarea editada")
      },
      error: (err) => {
        this.cargando = false;
        this.error    = 'Error al editar la tarea.';
        this.toast.error("Error al editar la tarea")
        console.error(err);
      },
    });
  }

  QuitarPrioridad(){
    this.cargando = true
    const t = this.tarea();
    this.tareaService.QuitarPrioridad(
    {
        nombreTarea:        t.nombreTarea,
        descripcionTarea:   t.descripcionTarea,
        fechaCreacionTarea: t.fechaCreacionTarea,
        estadosTarea:       t.estadosTarea,
        estaEliminado:      t.estaEliminado,
        tiposTarea:         t.tiposTarea,
        idUsuarioDeLaTarea: t.idUsuarioDeLaTarea,
        idEspacioDeTrabajo: t.espacioDeTrabajoId,
        tienePrioridad:     false,
        fechaLimite:        t.fechaCreacionTarea
      },t.idTarea
    ).subscribe({
      next: () => {
        this.cargando = false
        this.toast.success("Se ha quitado la prioridad")
        this.tareaEditada.emit();
      }
    });
  }

  onEliminar() {
    if (!confirm('¿Eliminar esta tarea?')) return;
    this.cargando=true

    this.tareaService.EliminarTarea(this.tarea().idTarea).subscribe({
      next: () => {
        this.cargando = false
        this.toast.success("Se ha eliminado")
        this.tareaEliminada.emit();
        this.cerrar.emit();
      },
      error: (err) => {
        this.cargando = false
        this.toast.error("Error al eliminar")
        this.error = 'Error al eliminar la tarea.';
        console.error(err);
      },
    });
  }
}