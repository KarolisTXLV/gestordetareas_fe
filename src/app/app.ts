import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./components/toast/toast";
import { inject } from '@vercel/analytics';

inject();

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent,],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
