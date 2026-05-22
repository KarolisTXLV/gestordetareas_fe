import {Component, EventEmitter, inject, input, OnInit, Output, output, signal,} from '@angular/core';
import { TareasService } from '../../services/tareas-service';
import { ObtenerTareas } from '../../models/obtener-tareas';
import { EditarTareaModal } from '../modals/editar-tarea-modal/editar-tarea-modal';
import { EditarTarea } from '../../models/editar-tarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarea-card',
  imports: [EditarTareaModal, FormsModule],
  templateUrl: './tarea-card.html',
  styleUrl: './tarea-card.css',
})
export class TareaCard implements OnInit {
  tarea = input.required<ObtenerTareas>();

  tareaEditada = output<void>();
  tareaEliminada = output<void>();
  @Output() cerrar = new EventEmitter<void>();
  modalEditarAbierto = signal(false);

  nombreTarea = '';
  descripcionTarea = '';
  estadosTarea = 0;
  cargando = false;
  error = '';

  private tareasService = inject(TareasService);

  ngOnInit() {
    this.nombreTarea = this.tarea().nombreTarea;
    this.descripcionTarea = this.tarea().descripcionTarea;
    this.estadosTarea = this.tarea().estadosTarea;
  }

  abrirModalEditar() {
    this.modalEditarAbierto.set(true);
  }
  cerrarModalEditar() {
    this.modalEditarAbierto.set(false);
  }
  onTareaEditada() {
    this.tareaEditada.emit();
  }
  onTareaEliminada() {
    this.tareaEliminada.emit();
  }
  onCambiarEstado() {
    const dto: EditarTarea = {
      nombreTarea: this.nombreTarea,
      descripcionTarea: this.descripcionTarea,
      estadosTarea: Number(this.estadosTarea),
    };

    this.tareasService.EditarTarea(dto, this.tarea().idTarea).subscribe({
      next: () => this.tareaEditada.emit(),
    });
  }
}
