import { Component, inject, OnInit, signal } from '@angular/core';
import { EspaciosDeTrabajoService } from '../../services/espacios-de-trabajo-service';
import { MostrarEspaciosDeTrabajo } from '../../models/mostrar-espacios-de-trabajo';

@Component({
  selector: 'app-panel-espacios-trabajo',
  imports: [],
  templateUrl: './panel-espacios-trabajo.html',
  styleUrl: './panel-espacios-trabajo.css',
})
export class PanelEspaciosTrabajo implements OnInit {
  private espaciosDeTrabajoService = inject(EspaciosDeTrabajoService);

  espaciosDeTrabajo = signal<MostrarEspaciosDeTrabajo[]>([]);

  ngOnInit() {
    this.espaciosDeTrabajoService.obtenerEspaciosDeTrabajo()
      .subscribe(data => this.espaciosDeTrabajo.set(data));
  }
}