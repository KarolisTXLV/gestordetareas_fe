import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MostrarEspaciosDeTrabajo } from '../models/mostrar-espacios-de-trabajo';

@Injectable({
  providedIn: 'root',
})
export class EspaciosDeTrabajoService {
  private http = inject(HttpClient);
  private baseUrl = "https://localhost:44380/api";


obtenerEspaciosDeTrabajo() {
  return this.http.get<MostrarEspaciosDeTrabajo[]>(`${this.baseUrl}/EspaciosDeTrabajo/MostrarEspaciosDeTrabajoPorUsuario`);
}
}
