import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toast = inject(ToastService);

  correo = '';
  contrasena = '';

  onSubmit() {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (res) => {
        this.toast.success('Se ha iniciado sesión');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/workspaces']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.toast.error('El correo o la contraseña son incorrectos');
        } else {
          this.toast.error('Error en el inicio de sesión');
        }
      },
    });
  }
}
