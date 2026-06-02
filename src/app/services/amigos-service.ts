import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObtenerDatosDeAmigoPorFriendTag } from '../models/obtener-datos-de-amigo-por-friend-tag';
import { ListarAmigos } from '../models/listar-amigos';

@Injectable({
  providedIn: 'root',
})
export class AmigosService {
  private http = inject(HttpClient);
  private baseUrl = 'https://gestordetareasapi.dekarolis.com/api';

  ObtenerAmigoPorFriendTag(friendTag: string) {
    return this.http.get<ObtenerDatosDeAmigoPorFriendTag>(
      `${this.baseUrl}/Usuarios/EncontrarAmigoPorFriendTag/${friendTag}`,
    );
  }
  ListarTodosLosAmigos() {
    return this.http.get<ListarAmigos[]>(`${this.baseUrl}/Usuarios/ListarTodosLosAmigos`);
  }
}
