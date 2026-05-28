import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Solicitudes } from '../models/solicitudes';
import { ListarNotificaciones } from '../models/listar-notificaciones';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44380/api';

  ObtenerSolicitudesDeAmistad() {
    return this.http.get<Solicitudes[]>(`${this.baseUrl}/Usuarios/ListarSolicitudesDeAmistad`);
  }

  ObtenerNotificaciones(){
     return this.http.get<ListarNotificaciones[]>(`${this.baseUrl}/Usuarios/ListarNotificacionesPorUsuario`);
  }
  MarcarNotificacionesComoLeidas(idNotificacion: number){
        return this.http.post(
      `${this.baseUrl}/Usuarios/MarcarNotificacionComoLeida/${idNotificacion}`,
      null,
    );
  }

  EnviarSolicitudAmistad(idUsuarioReceptor: number, tipoSolicitud: number) {
    return this.http.post(
      `${this.baseUrl}/Usuarios/EnviarSolicitud/${idUsuarioReceptor}/${tipoSolicitud}`,
      null,
    );
  }

  TramitarSolicitud(idSolicitud: number, resolucionSolicitud: number) {
    return this.http.post<void>(
      `${this.baseUrl}/Usuarios/TramitarSolicitud/${idSolicitud}/${resolucionSolicitud}`,
      null,
    );
  }
}
