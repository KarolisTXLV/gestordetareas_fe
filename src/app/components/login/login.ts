import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    private router = inject(Router)

  onSubmit() {
    this.router.navigate(['/workspace']);
  }
}
