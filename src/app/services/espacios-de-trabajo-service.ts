import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MostrarEspaciosDeTrabajo } from '../models/mostrar-espacios-de-trabajo';
import { CrearNuevoEspacioDeTrabajo } from '../models/crear-nuevo-espacio-de-trabajo';

@Injectable({
  providedIn: 'root',
})
export class EspaciosDeTrabajoService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44380/api';
  espaciosDeTrabajo = signal<MostrarEspaciosDeTrabajo[]>([]);
  tipoSolicitudInvitacionEspacioTreabajo = 1;

  constructor(http: HttpClient) {
    this.cargarEspacios(true);
  }

  obtenerEspaciosDeTrabajo() {
    return this.http.get<MostrarEspaciosDeTrabajo[]>(
      `${this.baseUrl}/EspaciosDeTrabajo/MostrarEspaciosDeTrabajoPorUsuario`,
    );
  }

  crearEspacioDeTrabajo(dto: CrearNuevoEspacioDeTrabajo) {
    return this.http.post(`${this.baseUrl}/EspaciosDeTrabajo/CrearNuevoEspacioDeTrabajo`, dto);
  }

  eliminarEspacioDeTrabajo(idEspacioDeTrabajo: number) {
    const params = new HttpParams().set('idEspacioDeTrabajo', idEspacioDeTrabajo);
    return this.http.post(`${this.baseUrl}/EspaciosDeTrabajo/Eliminar`, null, { params });
  }

  cargarEspacios(recargar:boolean) {
    if (this.espaciosDeTrabajo().length === 0 || recargar == true) {
      this.obtenerEspaciosDeTrabajo().subscribe((data) => this.espaciosDeTrabajo.set(data));
    }
  }
  invitarAEspacioDeTrabajo(idEspacioDeTrabajo:number, idUsuario: number){
    return this.http.post(`${this.baseUrl}/Usuarios/EnviarSolicitud/${idUsuario}/${this.tipoSolicitudInvitacionEspacioTreabajo}/${idEspacioDeTrabajo}`, null);
  }
}
