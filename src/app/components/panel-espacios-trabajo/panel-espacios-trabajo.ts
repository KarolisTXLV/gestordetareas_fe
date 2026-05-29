import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { EspaciosDeTrabajoService } from '../../services/espacios-de-trabajo-service';
import { MostrarEspaciosDeTrabajo } from '../../models/mostrar-espacios-de-trabajo';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrearNuevoEspacioDeTrabajo } from '../../models/crear-nuevo-espacio-de-trabajo';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-panel-espacios-trabajo',
  imports: [FormsModule],
  templateUrl: './panel-espacios-trabajo.html',
  styleUrl: './panel-espacios-trabajo.css',
})
export class PanelEspaciosTrabajo implements OnInit {
  idEspacioSeleccionado = signal<number | null>(null);
  private espaciosDeTrabajoService = inject(EspaciosDeTrabajoService);
  private router = inject(Router);
  private toast = inject(ToastService);
  nombreEspacioTrabajo = '';
  espaciosDeTrabajo = this.espaciosDeTrabajoService.espaciosDeTrabajo;
  cargando = false;

  ngOnInit() {
    this.espaciosDeTrabajoService.cargarEspacios(true);
  }

  seleccionarEspacio(id: number) {
    this.idEspacioSeleccionado.set(id);
    this.router.navigate(['/workspace'], { queryParams: { id } });
  }

  onSubmit() {
    const dto: CrearNuevoEspacioDeTrabajo = {
      nombre: this.nombreEspacioTrabajo.trim(),
    };

    this.espaciosDeTrabajoService.crearEspacioDeTrabajo(dto).subscribe({
      next: () => {
        this.nombreEspacioTrabajo = '';
        this.espaciosDeTrabajoService.cargarEspacios(true);
        this.toast.success("Espacio de trabajo creado correctamente")
      },
      error: (err) => {
        this.cargando = false;
        if (err.status === 400) {
          this.toast.error('El nombre del espacio es demasiado corto');
        } else {
          this.toast.error('Error al buscar el usuario.');
        }
      },
    });
  }
  onEliminar(id: number) {
    this.cargando = true;
    if (id === null) return;
    this.espaciosDeTrabajoService.eliminarEspacioDeTrabajo(id).subscribe(() => {
      this.cargando = false;
      this.espaciosDeTrabajoService.cargarEspacios(true);
      this.toast.info("espacio de trabajo eliminado correctamente")
    });
  }
}
