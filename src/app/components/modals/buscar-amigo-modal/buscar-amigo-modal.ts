import { Component, inject, input, output, signal, ChangeDetectorRef } from '@angular/core';
import { AmigosService } from '../../../services/amigos-service';
import { ObtenerDatosDeAmigoPorFriendTag } from '../../../models/obtener-datos-de-amigo-por-friend-tag';
import { FormsModule } from '@angular/forms';
import { NotificacionesService } from '../../../services/notificaciones-service';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'app-buscar-amigo-modal',
  imports: [FormsModule],
  templateUrl: './buscar-amigo-modal.html',
  styleUrl: './buscar-amigo-modal.css',
})
export class BuscarAmigoModal {
  cerrar = output<void>();
  amigoEncontrado = output<{ nombreUsuario: string; idUsuario: number }>();
  buscarAmigoAbierto = signal(false);
  friendTag = '';
  nombreAmigo = signal('');
  idAmigo = 0;
  tipoSolicitud_SolicitudAmistad = 0;
  cargando = false;
  error = '';
  private cdr = inject(ChangeDetectorRef);
  private toast = inject(ToastService);
  private amigoService = inject(AmigosService);
  private solicitudesService = inject(NotificacionesService);

  onOverlayClick(event: MouseEvent) {
    console.log('target:', (event.target as HTMLElement).className);
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.cerrar.emit();
    }
  }

  onSubmit() {
    if (!this.friendTag.trim()) {
      this.error = 'La FriendTag es obligatoria para poder buscar a la persona';
      return;
    }
    this.cargando = true;
    this.error = '';

    this.amigoService.ObtenerAmigoPorFriendTag(this.friendTag).subscribe({
      next: (res) => {
        this.cargando = false;
        this.nombreAmigo.set(res.nombreUsuario);
        this.idAmigo = res.idUsuario;
        this.amigoEncontrado.emit({ nombreUsuario: res.nombreUsuario, idUsuario: res.idUsuario });
      },
      error: (err) => {
        this.cargando = false;
        this.cdr.detectChanges();
        if (err.status === 404) {
          this.toast.error('No existe ningún usuario con ese tag.');
        } else {
          this.toast.error('Error al buscar el usuario.');
        }
      },
    });
  }
  onAnadirAmigo() {
    this.solicitudesService
      .EnviarSolicitudAmistad(this.idAmigo, this.tipoSolicitud_SolicitudAmistad)
      .subscribe({
        next: () => {
          this.toast.success('petición de amistad enviada');
          this.cerrar.emit();
        },
        error: (err) => {
          this.cargando = false;
          this.cdr.detectChanges();
          if (err.status === 409) {
            this.toast.error('El usuario ya es tu amigo');
          }
          if (err.status === 455) {
            this.toast.error('Ya tienes una solicitud de amistad pendiente con este usuario.');
          }
        },
      });
  }
}
