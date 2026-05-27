import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObtenerDatosDeAmigoPorFriendTag } from '../models/obtener-datos-de-amigo-por-friend-tag';

@Injectable({
  providedIn: 'root',
})
export class AmigosService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44380/api';

  ObtenerAmigoPorFriendTag(friendTag: string) {
    return this.http.get<ObtenerDatosDeAmigoPorFriendTag>(
      `${this.baseUrl}/Usuarios/EncontrarAmigoPorFriendTag/${friendTag}`,
    );
  }
  EnviarSolicitudAmistad(idUsuarioReceptor: number, tipoSolicitud: number) {
    return this.http.post(
      `${this.baseUrl}/Usuarios/EnviarSolicitud/${idUsuarioReceptor}/${tipoSolicitud}`,
      null,
    );
  }
}
