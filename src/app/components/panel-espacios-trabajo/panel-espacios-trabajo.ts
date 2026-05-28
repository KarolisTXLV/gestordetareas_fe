import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { EspaciosDeTrabajoService } from '../../services/espacios-de-trabajo-service';
import { MostrarEspaciosDeTrabajo } from '../../models/mostrar-espacios-de-trabajo';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CrearNuevoEspacioDeTrabajo } from '../../models/crear-nuevo-espacio-de-trabajo';

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
  nombreEspacioTrabajo = '';
  espaciosDeTrabajo = this.espaciosDeTrabajoService.espaciosDeTrabajo;
  cargando = false;

  ngOnInit() {
    this.espaciosDeTrabajoService.cargarEspacios(false);
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
      },
    });
  }
  onEliminar(id: number) {
    this.cargando = true;
    if (id === null) return;
    this.espaciosDeTrabajoService.eliminarEspacioDeTrabajo(id).subscribe(() => {
      this.cargando = false;
      this.espaciosDeTrabajoService.cargarEspacios(true);
    });
  }
}
