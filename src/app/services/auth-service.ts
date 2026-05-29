import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  expira: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http    = inject(HttpClient);
  private baseUrl = 'https://localhost:44380/api';

  private _token = signal<string | null>(this.cargarToken());

  readonly token          = this._token.asReadonly();
  readonly estaAutenticado = computed(() => this._token() !== null);

  login(correo: string, contrasena: string) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/Autorizacion/IniciarSesion`, { correo, contrasena })
      .pipe(
        tap((respuesta) => {
          localStorage.setItem('token',  respuesta.token);
          localStorage.setItem('expira', respuesta.expira);
          this._token.set(respuesta.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    this._token.set(null);
  }

  private cargarToken(): string | null {
    const token  = localStorage.getItem('token');
    const expira = localStorage.getItem('expira');

    if (!token || !expira) return null;

    const haExpirado = new Date(expira) < new Date();
    if (haExpirado) {
      localStorage.removeItem('token');
      localStorage.removeItem('expira');
      return null;
    }

    return token;
  }
}