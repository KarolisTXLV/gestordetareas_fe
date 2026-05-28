import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { BuscarAmigoModal } from '../modals/buscar-amigo-modal/buscar-amigo-modal';
import { NotificacionesService } from '../../services/notificaciones-service';
import { Solicitudes } from '../../models/solicitudes';
import { ListarAmigosModal } from '../modals/listar-amigos-modal/listar-amigos-modal';
import { AmigosService } from '../../services/amigos-service';
import { ListarAmigos } from '../../models/listar-amigos';
import { ListarNotificaciones } from '../../models/listar-notificaciones';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet, BuscarAmigoModal, ListarAmigosModal],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  buscarAmigoAbierto = signal(false);
  mostrarAmigosAbierto = signal(false);
  private router = inject(Router);
  notificacionesAbiertas = signal(false);
  ajustesAbiertos = signal(false);
  private notificacionesService = inject(NotificacionesService);
  private amigosService = inject(AmigosService);
  error = '';
  solicitudes = signal<Solicitudes[]>([]);
  notifiaciones = signal<ListarNotificaciones[]>([]);
  amigos = signal<ListarAmigos[]>([]);
  solicitudAceptada = 1;
  solicitudRechazada = 2;

  rutaActual = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  ngOnInit(): void {
    this.MostrarNotificaciones();
    this.amigosService.ListarTodosLosAmigos().subscribe({
      next: (res) => this.amigos.set(res),
    });
  }

  vueltaAtras() {
    this.router.navigate(['/workspaces']);
  }
  CerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onAmigoEncontrado(amigo: { nombreUsuario: string; idUsuario: number }) {
    console.log(amigo.nombreUsuario, amigo.idUsuario);
  }

  MostrarNotificaciones() {
    this.notificacionesService.ObtenerSolicitudesDeAmistad().subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.error = 'No hay solicitudes.';
          return;
        }
        this.solicitudes.set(res);
      },
    });
    this.notificacionesService.ObtenerNotificaciones().subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.error = 'No hay solicitudes.';
          return;
        }
        this.notifiaciones.set(res);
      },
    });
  }
  aceptarSolicitud(idSolicitud: number) {
    this.notificacionesService
      .TramitarSolicitudAmistad(idSolicitud, this.solicitudAceptada)
      .subscribe({
        next: () => this.MostrarNotificaciones(),
      });
  }
  rechazarSolicitud(idSolicitud: number) {
    this.notificacionesService
      .TramitarSolicitudAmistad(idSolicitud, this.solicitudRechazada)
      .subscribe({
        next: () => this.MostrarNotificaciones(),
      });
  }
}
