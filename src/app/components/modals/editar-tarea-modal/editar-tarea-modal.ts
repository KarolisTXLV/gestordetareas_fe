import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas-service';
import { EditarTarea } from '../../../models/editar-tarea';
import { ObtenerTareas } from '../../../models/obtener-tareas';

@Component({
  selector: 'app-editar-tarea-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-tarea-modal.html',
  styleUrl: './editar-tarea-modal.css',
})
export class EditarTareaModal implements OnInit {
  @Input() tarea!: ObtenerTareas;
  @Input() idEspacioDeTrabajo!: number;
  @Output() cerrar = new EventEmitter<void>();
  @Output() tareaEditada = new EventEmitter<void>();
  @Output() tareaEliminada = new EventEmitter<void>();

  nombreTarea = '';
  descripcionTarea = '';
  estadosTarea = 0;
  cargando = false;
  error = '';

  constructor(private tareaService: TareasService) {
    console.log('modal creado');
  }

  ngOnInit() {
    this.nombreTarea = this.tarea.nombreTarea;
    this.descripcionTarea = this.tarea.descripcionTarea;
    console.log(this.tarea);
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
    this.error = '';

    const dto: EditarTarea = {
      nombreTarea: this.nombreTarea.trim(),
      descripcionTarea: this.descripcionTarea.trim(),
      estadosTarea:this.estadosTarea
    };

    this.tareaService.EditarTarea(dto, this.tarea.idTarea).subscribe({
      next: () => {
        this.cargando = false;
        this.tareaEditada.emit();
        this.cerrar.emit();
      },
      error: (err) => {
        this.cargando = false;
        this.error = 'Error al editar la tarea.';
        console.error(err);
      },
    });
  }

  onEliminar() {
    if (confirm('¿Eliminar esta tarea?')) {
      this.tareaService.EliminarTarea(this.tarea.idTarea).subscribe({
        next: () => {
          this.tareaEliminada.emit();
          this.cerrar.emit();
        },
        error: (err) => {
          this.cargando = false;
          this.error = 'Error al eliminar la tarea.';
          console.error(err);
        },
      });
    }
  }
}
