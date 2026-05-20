import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CrearUsuario } from '../models/crear-usuario';

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
  private http = inject(HttpClient);
  private baseUrl = "https://localhost:44380/api";


  crear(dto: CrearUsuario){
    return this.http.post(
      `${this.baseUrl}/Usuarios/CrearUsuario`,
      dto
    );
  }
}


