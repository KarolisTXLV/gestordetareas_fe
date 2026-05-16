import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TareaCard } from "./components/tarea-card/tarea-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TareaCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GestorDeTareasFE');
}
