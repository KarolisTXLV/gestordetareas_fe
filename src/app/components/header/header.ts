import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { BuscarAmigoModal } from '../modals/buscar-amigo-modal/buscar-amigo-modal';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, BuscarAmigoModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  buscarAmigoAbierto = signal(false);
  private router = inject(Router);
  notificacionesAbiertas = signal(false);
  ajustesAbiertos = signal(false);

  rutaActual = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  vueltaAtras() {
    this.router.navigate(['/workspaces']);
  }
  CerrarSesion(){
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
  onAmigoEncontrado(amigo: { nombreUsuario: string, idUsuario: number }) {
  console.log(amigo.nombreUsuario, amigo.idUsuario);
}
}
