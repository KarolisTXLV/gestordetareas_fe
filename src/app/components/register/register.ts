import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuarioservice } from '../../services/usuarioservice';
import { CrearUsuario } from '../../models/crear-usuario';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './register.html',
})
export class RegistroComponent {
  dto: CrearUsuario = {
    nombreUsuario: '',
    correoUsuario: '',
    contrasenaUsuario: '',
  };

  constructor(private usuarioService: Usuarioservice) {}

  onSubmit() {
    this.usuarioService.crear(this.dto).subscribe({
      next: (res) => console.log('Registrado:', res),
      error: (err) => console.error('Error:', err),
    });
  }
}
