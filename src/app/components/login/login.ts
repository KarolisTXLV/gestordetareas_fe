import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Logueo } from '../../models/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);

  constructor(private authService: AuthService) {}

  dto: Logueo = {
    correo: '',
    contrasena: '',
  };

  onSubmit() {
    this.authService.login(this.dto.correo, this.dto.contrasena).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/workspaces']);
      },
      error: (err) => console.error('Error:', err),
    });
  }
}
