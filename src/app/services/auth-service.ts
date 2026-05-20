import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface login {
  token: string;
  expira: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:44380/api';

  private _token = signal<string | null>(null);

  readonly token = this._token.asReadonly();
  readonly estaAutenticado = computed(() => this._token() !== null);

  login(correo: string, contrasena: string) {
    return this.http
      .post<login>(`${this.baseUrl}/Autorizacion/IniciarSesion`, { correo, contrasena })
      .pipe(tap((respuesta) => this._token.set(respuesta.token)));
  }

  logout(): void {
    this._token.set(null);
  }
}
