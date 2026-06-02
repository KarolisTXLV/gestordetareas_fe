import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://gestordetareasapi.dekarolis.com/api';

  private _token = signal<string | null>(this.cargarToken());

  readonly token = this._token.asReadonly();
  readonly estaAutenticado = computed(() => this._token() !== null);

  login(correo: string, contrasena: string) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/Autorizacion/IniciarSesion`, { correo, contrasena })
      .pipe(
        tap((respuesta) => {
          localStorage.setItem('token', respuesta.token);
          this._token.set(respuesta.token);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._token.set(null);
  }

  private cargarToken(): string | null {
    const token = localStorage.getItem('token');

    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    const exp = payload.exp * 1000;

    if (Date.now() > exp) {
      localStorage.removeItem('token');
      return null;
    }

    return token;
  }
}
