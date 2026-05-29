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
import { Usuarioservice } from '../../services/usuarioservice';
import { ObtenerDatosUsuarioLogueado } from '../../models/obtener-datos-usuario-logueado';
import { ToastService } from '../../services/toast-service';
import { EspaciosDeTrabajoService } from '../../services/espacios-de-trabajo-service';

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
  private usuarioService = inject(Usuarioservice);
  private espaciosDeTrabajoServie = inject(EspaciosDeTrabajoService)
  private toast = inject(ToastService);
  error = '';
  solicitudes = signal<Solicitudes[]>([]);
  notifiaciones = signal<ListarNotificaciones[]>([]);
  amigos = signal<ListarAmigos[]>([]);
  datosUsuario = signal<ObtenerDatosUsuarioLogueado | null>(null);
  solicitudAceptada = 1;
  solicitudRechazada = 2;
  copiado = false;

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
    this.obtenerDatosUsuarioLogueado();
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
        this.solicitudes.set(res ?? []);
      },
    });

    this.notificacionesService.ObtenerNotificaciones().subscribe({
      next: (res) => {
        this.notifiaciones.set(res ?? []);
      },
    });
  }
  aceptarSolicitud(idSolicitud: number) {
    this.notificacionesService.TramitarSolicitud(idSolicitud, this.solicitudAceptada).subscribe({
      next: () => {
        this.MostrarNotificaciones();
        this.toast.success('Solicitud aceptada');
        this.espaciosDeTrabajoServie.cargarEspacios(true);
      },
      error: () => this.toast.error('No se pudo aceptar la solicitud'),
    });
  }
  rechazarSolicitud(idSolicitud: number) {
    this.notificacionesService.TramitarSolicitud(idSolicitud, this.solicitudRechazada).subscribe({
      next: () => {
        this.MostrarNotificaciones();
        this.toast.success('Solicitud rechazada');
      },
      error: () => this.toast.error('No se pudo rechazar la solicitud'),
    });
  }

  marcarNotificacionComoLeida(idNotificacion: number) {
    this.notificacionesService.MarcarNotificacionesComoLeidas(idNotificacion).subscribe({
      next: () => {
        this.MostrarNotificaciones();
      },
    });
  }

  obtenerDatosUsuarioLogueado() {
    this.usuarioService.obtenerDatosDelUsuarioLogueado().subscribe({
      next: (data) => this.datosUsuario.set(data),
    });
  }

  copiarFriendTag() {
    const tag = this.datosUsuario()?.friendTag;
    if (!tag) return;

    navigator.clipboard.writeText(tag).then(() => {
      this.copiado = true;
      setTimeout(() => (this.copiado = false), 2000);
    });
  }
}
