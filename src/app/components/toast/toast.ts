import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="flex items-center justify-between gap-4 px-4 py-3 rounded-xl text-sm font-medium shadow-lg min-w-64 max-w-sm"
          [class]="estilos[toast.tipo]"
        >
          <span>{{ toast.mensaje }}</span>
          <button (click)="toastService.cerrar(toast.id)" class="opacity-60 hover:opacity-100 text-lg leading-none">✕</button>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  toastService = inject(ToastService);

  estilos = {
    success: 'bg-green-500/20  text-green-300  border border-green-500/30',
    error:   'bg-red-500/20    text-red-300    border border-red-500/30',
    info:    'bg-blue-500/20   text-blue-300   border border-blue-500/30',
    warning: 'bg-amber-500/20  text-amber-300  border border-amber-500/30',
  };
}