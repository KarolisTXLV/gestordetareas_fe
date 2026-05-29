import { Injectable, signal } from '@angular/core';

export type ToastTipo = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id:      number;
  mensaje: string;
  tipo:    ToastTipo;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts  = this._toasts.asReadonly();

  private nextId = 0;

  mostrar(mensaje: string, tipo: ToastTipo = 'info', duracion = 3000) {
    const id = this.nextId++;
    this._toasts.update(ts => [...ts, { id, mensaje, tipo }]);
    setTimeout(() => this.cerrar(id), duracion);
  }

  success(mensaje: string) { this.mostrar(mensaje, 'success'); }
  error  (mensaje: string) { this.mostrar(mensaje, 'error');   }
  info   (mensaje: string) { this.mostrar(mensaje, 'info');    }
  warning(mensaje: string) { this.mostrar(mensaje, 'warning'); }

  cerrar(id: number) {
    this._toasts.update(ts => ts.filter(t => t.id !== id));
  }
}