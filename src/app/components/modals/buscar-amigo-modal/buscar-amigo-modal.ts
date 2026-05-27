import { Component, inject, input, output, signal } from '@angular/core';
import { AmigosService } from '../../../services/amigos-service';
import { ObtenerDatosDeAmigoPorFriendTag } from '../../../models/obtener-datos-de-amigo-por-friend-tag';
import { FormsModule } from '@angular/forms';

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

  private amigoService = inject(AmigosService);

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
        if (!res) {
          this.error = 'No existe ningún usuario con ese tag.';
          return;
        }
        this.nombreAmigo.set(res.nombreUsuario);
        this.idAmigo = res.idUsuario;
        this.amigoEncontrado.emit({ nombreUsuario: res.nombreUsuario, idUsuario: res.idUsuario });
      },
      error: (err) => {
        this.cargando = false;
        this.error = 'Error al buscar el usuario.';
        console.error(err);
      },
    });
  }
  onAnadirAmigo() {
    this.amigoService
      .EnviarSolicitudAmistad(this.idAmigo, this.tipoSolicitud_SolicitudAmistad)
      .subscribe({
        next: () => {
          this.cerrar.emit();
        },
      });
  }
}
