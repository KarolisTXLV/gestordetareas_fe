import { Routes } from '@angular/router';

export const routes: Routes = [
  
  { path: 'login',      loadComponent: () => import('./components/login/login').then(m => m.Login) },
  { path: 'register',   loadComponent: () => import('./components/register/register').then(m => m.Register) },
  { path: 'workspace',  loadComponent: () => import('./components/espacio-de-trabajo/espacio-de-trabajo').then(m => m.EspacioDeTrabajo) },
  { path: '',           redirectTo: 'login', pathMatch: 'full' }
];
